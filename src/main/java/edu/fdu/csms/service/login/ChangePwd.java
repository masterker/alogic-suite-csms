package edu.fdu.csms.service.login;

import java.sql.Connection;
import java.util.Map;

import com.alogic.idu.util.IDUBase;
import com.anysoft.util.Properties;
import com.anysoft.util.code.Coder;
import com.anysoft.util.code.CoderFactory;
import com.logicbus.backend.Context;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.Session;
import com.logicbus.backend.SessionManager;
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.dbcp.sql.Select;
import com.logicbus.dbcp.sql.Update;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 修改密码
 * 
 * @author limf
 */
public class ChangePwd extends IDUBase {

	/**
	 * 是否需要验证码,可通过checkIdCode配置，缺省为true
	 */
	protected boolean checkIdCode = true;

	/**
	 * DES3编码器
	 */
	protected Coder encrypter = null;

	/**
	 * MD5编码器
	 */
	protected Coder md5Coder = null;

	protected String sqlQueryManagerPwd = "select manager_password pwd from manager where manager_no= ?";
	protected String sqlChangeManagerPwd = "update manager set manager_password=? where manager_no = ?";

	protected String sqlQueryTeacherPwd = "select teacher_password pwd from teacher where teacher_no= ?";
	protected String sqlChangeTeacherPwd = "update teacher set teacher_password=? where teacher_no = ?";

	protected String sqlQueryStudentPwd = "select student_password pwd from student where student_no= ?";
	protected String sqlChangeStudentPwd = "update student set student_password=? where student_no = ?";

	protected String sqlQueryPwd = "";
	protected String sqlChangePwd = "";

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		encrypter = CoderFactory.newCoder("DES3");
		md5Coder = CoderFactory.newCoder("MD5");
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {
		String oldPwd = getArgument("oldPwd", ctx);
		String newPwd = getArgument("newPwd", ctx);
		boolean isEncrypt = Boolean.valueOf(getArgument("encrypt", "false", ctx));

		Select selector = null;
		Update updater = null;
		try {
			Session session = SessionManager.get().getSession(ctx, false);
			if (session == null) {
				throw new ServantException("user.invalid_access", "User has not logged in");
			}

			String userId = session.hGet("user", "id", "");
			if (isNull(userId)) {
				throw new ServantException("user.invalid_access", "User has not logged in");
			}

			String loginType = session.hGet("user", "loginType", "");
			String loginId = session.hGet("user", "loginId", "");

			if ("manager".equals(loginType)) {
				sqlQueryPwd = sqlQueryManagerPwd;
				sqlChangePwd = sqlChangeManagerPwd;
			} else if ("teacher".equals(loginType)) {
				sqlQueryPwd = sqlQueryTeacherPwd;
				sqlChangePwd = sqlChangeTeacherPwd;
			} else if ("student".equals(loginType)) {
				sqlQueryPwd = sqlQueryStudentPwd;
				sqlChangePwd = sqlChangeStudentPwd;
			}

			if (checkIdCode) {
				// 在验证码模式下，采用验证码作为key进行解码
				String loginCode = session.GetValue("login.code", "");

				if (loginCode == null || loginCode.length() <= 0) {
					throw new ServantException("user.invalid_access", "Can not find login code.");
				}

				if (isEncrypt) {
					oldPwd = encrypter.decode(oldPwd, loginCode);
					newPwd = encrypter.decode(newPwd, loginCode);
				} else {
					String _loginCode = getArgument("code", ctx);
					if (!loginCode.equals(_loginCode)) {
						throw new ServantException("user.invalid_access", "Login code is not correct.");
					}
				}
			} else {
				// 在非验证码模式下，采用用户名作为key进行解码
				if (isEncrypt) {
					oldPwd = encrypter.decode(oldPwd, userId);
					newPwd = encrypter.decode(newPwd, userId);
				}
			}

			selector = new Select(conn);
			updater = new Update(conn);

			Map<String, String> result = selector.execute(sqlQueryPwd, loginId).singleRowAsString();
			if (result == null) {
				throw new ServantException("user.data_not_found", loginType + " " + loginId + " does not exist.");
			}
			String _password = result.get("pwd");
			// 数据库中的密码是通过密码+用户名进行MD5加密的
			oldPwd = md5Coder.encode(oldPwd, loginId);

			if (!oldPwd.equals(_password)) {
				throw new ServantException("user.invalid_access", "The old password is not correct.");
			}

			newPwd = md5Coder.encode(newPwd, loginId);

			updater.execute(sqlChangePwd, newPwd, loginId);

			bizLog(conn, loginId, ctx.getClientIp(), loginId, ctx);
		} catch (Exception ex) {
			bizLog(conn, "", ctx.getClientIp(), "", "用户修改密码失败:" + ex.getMessage());
			throw ex;
		} finally {
			Select.close(selector);
			Update.close(updater);
		}
	}

}
