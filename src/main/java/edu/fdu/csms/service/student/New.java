package edu.fdu.csms.service.student;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alogic.cache.core.CacheStore;
import com.alogic.cache.core.MultiFieldObject;
import com.alogic.idu.util.IDUBase;
import com.anysoft.util.Properties;
import com.anysoft.util.PropertiesConstants;
import com.anysoft.util.code.Coder;
import com.anysoft.util.code.CoderFactory;
import com.logicbus.backend.Context;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.dbcp.processor.Preprocessor;
import com.logicbus.dbcp.sql.DBTools;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 新增学生
 * 
 * @author limf
 */
public class New extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		sqlInsert = PropertiesConstants.getString(p, "sql.Insert", sqlInsert);
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
		dataId = PropertiesConstants.getString(p, "dataGuard.id", dataId);
		processor = new Preprocessor(sqlInsert);
	}

	protected String encodePassword(String password, String loginId) throws Exception {
		Coder md5Coder = CoderFactory.newCoder("MD5");
		String _password = md5Coder.encode(password, loginId);
		return _password;
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {
		String userId = getArgument("user.id", "", ctx);
		String id = getArgument("id", ctx);

		String password = getArgument("password", ctx);
		if (password != null && password.length() > 0) {
			String encodePassword = encodePassword(password, id);
			ctx.SetValue("encodePassword", encodePassword);
		}

		String dataGuardObject = getArgument(dataId, id, ctx);
		if (!checkPrivilege(userId, dataGuardObject)) {
			throw new ServantException("core.unauthorized", "无权访问本服务，用户:" + userId);
		}

		CacheStore cache = getCacheStore();

		MultiFieldObject found = cache.get(id, true);
		if (found != null) {
			throw new ServantException("core.data_exists", "The object exists,id=" + id);
		}

		List<Object> userData = new ArrayList<Object>();
		String sql = processor.process(ctx, userData);

		if (userData.size() > 0) {
			DBTools.insert(conn, sql, userData.toArray());
		} else {
			DBTools.insert(conn, sql);
		}

		bizLog(conn, userId, ctx.getClientIp(), id, "新增学生" + id);

		found = cache.get(id, true);

		Map<String, Object> output = new HashMap<String, Object>();

		found.toJson(output);

		msg.getRoot().put(rootName, output);
	}

	protected String sqlInsert = "";

	protected Preprocessor processor = null;

	protected String rootName = "data";

	protected String dataId = "id";

}
