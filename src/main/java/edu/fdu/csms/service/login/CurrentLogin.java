package edu.fdu.csms.service.login;

import java.util.HashMap;
import java.util.Map;

import com.alogic.cache.context.CacheSource;
import com.alogic.cache.core.CacheStore;
import com.alogic.cache.core.MultiFieldObject;
import com.alogic.idu.util.Base;
import com.anysoft.util.Properties;
import com.logicbus.backend.Context;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.Session;
import com.logicbus.backend.SessionManager;
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 查询当前登录信息
 * 
 * @author limf
 */
public class CurrentLogin extends Base {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) {
		// nothing to do
	}

	@Override
	protected int onJson(Context ctx, JsonMessage msg) {

		Map<String, Object> user = new HashMap<String, Object>();

		Session session = SessionManager.get().getSession(ctx, true);
		if (session != null) {
			boolean isLogin = session.hExist("user", "id");
			if (isLogin) {
				Map<String, String> sessionInfo = session.hGetAll("user");
				if (sessionInfo != null) {
					String id = sessionInfo.get("id");

					String[] userRole = id.split("@");

					String role = userRole[1];
					CacheStore cache = null;
					if ("manager".equals(role)) {
						cache = getCacheStore("managers");
					} else if ("teacher".equals(role)) {
						cache = getCacheStore("teachers");
					} else if ("student".equals(role)) {
						cache = getCacheStore("students");
					}

					MultiFieldObject found = cache.get(userRole[0], true);
					if (found == null) {
						user.put("isLogin", "false");
					} else {
						user.put("isLogin", "true");
						// 输出缓存数据
						found.toJson(user);
						// 输出会话数据
						for (String key : sessionInfo.keySet()) {
							user.put(key, sessionInfo.get(key));
						}
					}
				} else {
					user.put("isLogin", "false");
				}
			} else {
				user.put("isLogin", "false");
			}
			user.put("token", getSessionId(ctx, session));
		} else {
			user.put("isLogin", "false");
		}

		msg.getRoot().put("user", user);

		return 0;
	}

	protected String getSessionId(Context ctx, Session session) {
		return session.getId();
	}

	protected CacheStore getCacheStore(String cacheId) {
		if (isNull(cacheId)) {
			throw new ServantException("core.cache_not_defined", "The relational cache is not defined" + cacheId);
		}
		CacheSource cs = CacheSource.get();

		CacheStore store = cs.get(cacheId);

		if (store == null) {
			throw new ServantException("core.cache_not_found", "The cache is not found,customCacheId=" + cacheId);
		}
		return store;
	}

}
