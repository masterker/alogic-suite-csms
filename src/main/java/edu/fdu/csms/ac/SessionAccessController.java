package edu.fdu.csms.ac;

import com.alogic.cache.context.CacheSource;
import com.alogic.cache.core.MultiFieldObject;
import com.anysoft.util.Properties;
import com.anysoft.util.PropertiesConstants;
import com.anysoft.util.StringMatcher;
import com.anysoft.util.code.util.RSAUtil;
import com.logicbus.backend.AbstractAccessController;
import com.logicbus.backend.Context;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.Session;
import com.logicbus.backend.SessionManager;
import com.logicbus.models.catalog.Path;
import com.logicbus.models.servant.Argument;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 基于登录会话的访问控制器
 * 
 * @author limf
 */
public class SessionAccessController extends AbstractAccessController {
	/**
	 * 最大并发数，可通过环境变量acm.maxThread来配置，缺省为10
	 */
	protected int maxThread = 10;

	/**
	 * 一分钟内访问次数限制，可通过环境变量acm.maxTimesPerMin来配置，缺省为100000
	 */
	protected int maxtimesPerMin = 100000;

	/**
	 * 匿名用户的用户名，可通过环境变量acm.anonymous来配置，缺省为anonymous
	 */
	protected String anonymousUser = "anonymous";

	/**
	 * 应用ID的参数名称，可通过环境变量acm.appid来配置，缺省为appid
	 */
	protected String appId = "appid";

	/**
	 * 应用标签的参数名称，可通过环境变量acm.signature来配置，缺省为signature
	 */
	protected String signature = "signature";

	/**
	 * token的参数名称，可通过环境变量acm.token来配置，缺省为token
	 */
	protected String token = "token";

	/**
	 * 应用接入策略缓存ID的参数名称，可通过环境变量acm.appstrategys.cacheid来配置，缺省为appstrategys
	 */
	protected String appStrategysId = "appstrategys";

	/**
	 * 用户角色缓存ID的参数名称，可通过环境变量acm.userroles.cacheid来配置，缺省为userroles
	 */
	protected String userRolesId = "userroles";

	/**
	 * 白名单
	 */
	protected StringMatcher whiteList = null;

	public SessionAccessController() {
	}

	@Override
	public void configure(Properties props) {
		maxThread = PropertiesConstants.getInt(props, "acm.maxThread", maxThread);
		maxtimesPerMin = PropertiesConstants.getInt(props, "acm.maxTimesPerMin", maxtimesPerMin);
		anonymousUser = PropertiesConstants.getString(props, "acm.anonymous", anonymousUser);
		appId = PropertiesConstants.getString(props, "acm.appid", appId);
		appStrategysId = PropertiesConstants.getString(props, "acm.appstrategys.cacheid", appStrategysId);
		userRolesId = PropertiesConstants.getString(props, "acm.userroles.cacheid", userRolesId);
		signature = PropertiesConstants.getString(props, "acm.signature", signature);
		token = PropertiesConstants.getString(props, "acm.token", token);
		String list = PropertiesConstants.getString(props, "acm.whitelist", "*");
		whiteList = new StringMatcher(list);
	}

	@Override
	public String createSessionId(Path serviceId, ServiceDescription servant, Context ctx) {
		// 获取服务访问中的appId参数,作为统计并发数和链接次数的维度
		String appArgu = ctx.GetValue(appId, "");
		String currentId = "";

		if (!appArgu.equals("")) {
			currentId = appArgu;
			ctx.SetValue("access.role", "app");
		} else {
			// 获取当前的登录Session
			Session session = SessionManager.get().getSession(ctx, false);

			// 如果没有登录，当前用户设置为匿名用户
			// 如果已经登录，从登录Session获取用户id
			currentId = session == null ? (anonymousUser) : session.hGet("user", "id", "anonymous");

			ctx.SetValue("access.role", "user");
		}
		// 设置到本次服务调用的Context中，以便服务获取当前用户id
		ctx.SetValue("user.id", currentId);

		return currentId;
	}

	@Override
	protected int getClientPriority(String sessionId, Path serviceId, ServiceDescription servant, Context ctx,
			AccessStat stat) {

		int priority = -1;
		MultiFieldObject appStrategys = null;

		// 1.对最大并发数和每分钟最大连接数进行判断，违反规则，设置优先级为-1
		if (ctx.GetValue("access.role", "").equals("app")) {
			// 获取服务访问中的app参数
			String app = sessionId;

			// 从缓存获取当前应用的访问策略
			CacheSource cs = CacheSource.get();
			appStrategys = cs.getObject(appStrategysId, app, true);

			if (appStrategys == null) {
				throw new ServantException("server.caches_not_found", "Can not find appStrategys:" + app);
			}

			maxThread = Integer.parseInt(appStrategys.getField("maxThread", String.valueOf(maxThread)));
			maxtimesPerMin = Integer.parseInt(appStrategys.getField("maxTimes", String.valueOf(maxtimesPerMin)));
		}

		if (stat.thread > maxThread || stat.timesOneMin > maxtimesPerMin) {
			return priority;
		}

		// 若服务为公共服务，则在不违反并发规则的情况下，都可以访问
		if (servant.getVisible().equals("public")) {
			// 是公共服务
			priority = 0;
			return priority;
		}

		String clientIp = ctx.getClientIp();

		//白名单中的用户或应用所有服务都可以访问
		/*if (whiteList.match(clientIp)) {
			return 0;
		}*/

		// 若访问者为用户，则只需获取用户对该服务的访问优先级即可
		if (ctx.GetValue("access.role", "").equals("user")) {
			if (!sessionId.startsWith(anonymousUser)) {// 已经登录，查看这个用户的优先级
				priority = getServicePriority(sessionId, serviceId, servant);
				return priority;
			} else {
				return -1;
			}
		}
		
		//后续验证只有在访问者为应用时才生效
		if (!ctx.GetValue("access.role", "").equals("app")) {
			return -1;
		}

		// 2.对IP地址进行匹配,若不在范围内，设置优先级为-1
		String matchIps = appStrategys.getField("clientIps", "");

		if (!matchIps.equals("") && !matchIps.equals("*.*.*.*;")) {
			if (clientIp == null) {
				throw new ServantException("client.clientip_not_found", "Can not get client ip!");
			}
			
			String[] splitAddress = matchIps.split(";");
			boolean ipMatch = false;

			for (int i = 0; (splitAddress != null) && i < splitAddress.length; i++) {
				StringMatcher ipMatcher = new StringMatcher(splitAddress[i]);
				if (ipMatcher.match(clientIp)) {
					ipMatch = true;
					break;
				}
			}

			if (!ipMatch) {
				return priority;
			}
		}

		// 3.对密钥进行验证，若验证不通过，设置优先级为-1
		String currentSign = getArgument(signature, servant, ctx);
		String currentToken = getArgument(token, servant, ctx);
		String publicKey = appStrategys.getField("publicKey", "");

		if (publicKey == null) {
			throw new ServantException("server.publicKey_not_found", "Publickey is not found:" + publicKey);
		}

		if (!RSAUtil.verify(currentToken, publicKey, currentSign)) {
			return priority;
		}

		// 4.验证应用是否有权限访问该服务
		priority = getServicePriority(sessionId, serviceId, servant);
		if (priority < 0) {
			return priority;
		}

		// 5.前面验证均已通过，将priority赋为应用策略中的值
		priority = Integer.parseInt(appStrategys.getField("priority", "0"));

		return priority;
	}

	protected String getArgument(String id, ServiceDescription servant, Context ctx) {
		Argument argu = servant.getArgument(id);
		String value;
		if (argu == null) {
			// 没有定义参数
			value = ctx.GetValue(id, "");
		} else {
			value = argu.getValue(ctx);
		}
		if (value == null || value.length() <= 0) {
			throw new ServantException("client.args_not_found", "Can not find parameter:" + id);
		}
		return value;
	}

	/**
	 * 获取当前用户对服务的访问优先级
	 * 
	 * @param userId
	 *            当前用户id
	 * @param serviceId
	 *            要访问的服务
	 * @param servant
	 *            服务的描述
	 * @return 优先级
	 */
	protected int getServicePriority(String userId, Path serviceId, ServiceDescription servant) {
		return 0;
	}
}
