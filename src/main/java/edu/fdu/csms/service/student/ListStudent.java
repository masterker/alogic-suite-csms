package edu.fdu.csms.service.student;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alogic.idu.util.IDUBase;
import com.anysoft.util.Properties;
import com.anysoft.util.PropertiesConstants;
import com.logicbus.backend.Context;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.Session;
import com.logicbus.backend.SessionManager;
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.dbcp.processor.Preprocessor;
import com.logicbus.dbcp.sql.DBTools;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 获取课程列表
 * 
 * @author limf
 */
public class ListStudent extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
		sqlQuery = PropertiesConstants.getString(p, "sql.Query", rootName);
		processor = new Preprocessor(sqlQuery);
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {

		// 服务权限判断
		Session session = SessionManager.get().getSession(ctx, false);
		String role = session == null ? "anonymous" : session.hGet("user", "loginType", "anonymous");
		if (!"manager".equals(role)) {
			throw new ServantException("core.unauthorized", role + "用户无权访问本服务");
		}

		List<Object> data = new ArrayList<Object>();

		String sql = processor.process(ctx, data);
		List<Map<String, Object>> result = null;

		if (data.size() <= 0) {
			result = DBTools.listAsObject(conn, sql);
		} else {
			result = DBTools.listAsObject(conn, sql, data.toArray());
		}

		msg.getRoot().put(rootName, result);
	}

	protected String rootName = "data";

	protected String sqlQuery = "";

	protected Preprocessor processor = null;
}
