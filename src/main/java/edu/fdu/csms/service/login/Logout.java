package edu.fdu.csms.service.login;

import java.sql.Connection;

import com.alogic.idu.util.IDUBase;
import com.anysoft.util.Properties;
import com.logicbus.backend.Context;
import com.logicbus.backend.Session;
import com.logicbus.backend.SessionManager;
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 退出登录
 * 
 * @author limf
 */
public class Logout extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) {
		// nothing to do
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) {
		Session session = SessionManager.get().getSession(ctx, false);
		if (session != null) {
			String userId = session.hGet("user", "id", "");
			if (!isNull(userId)) {
				bizLog(conn, userId, ctx.getClientIp(), userId, "用户" + userId + "退出登录！");
			}
			session.invalidate();
		} else {
			// 没有登录
		}
	}
}
