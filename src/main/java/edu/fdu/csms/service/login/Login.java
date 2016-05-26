package edu.fdu.csms.service.login;

import java.sql.Connection;
import java.util.Map;

import com.alogic.idu.util.IDUBase;
import com.anysoft.util.Properties;
import com.anysoft.util.PropertiesConstants;
import com.anysoft.util.code.Coder;
import com.anysoft.util.code.CoderFactory;
import com.logicbus.backend.Context;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.Session;
import com.logicbus.backend.SessionManager;
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.dbcp.sql.Select;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 系统登录
 *
 * @author limf
 */
public class Login extends IDUBase {

	/**
	 * 是否校验验证码，可通过参数checkIdCode配置，缺省为true
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

	/**
	 * 查询用户密码的SQL语句，根据用户角色的不同选择去不同角色表查询
	 */
	protected String sqlQueryManagerInfo = "select manager_password pwd from manager where manager_no=?";
	protected String sqlQueryTeacherInfo = "select teacher_password pwd from teacher where teacher_no=?";
	protected String sqlQueryStudentInfo = "select student_password pwd from student where student_no=?";

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) {
		checkIdCode = PropertiesConstants.getBoolean(p, "checkIdCode", checkIdCode, true);
		encrypter = CoderFactory.newCoder("DES3");
		md5Coder = CoderFactory.newCoder("MD5");
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) {
		String loginId = getArgument("loginId", ctx);
		String password = getArgument("pwd", ctx);
		String role = getArgument("role", ctx);
		boolean isEncrypt = getArgument("encrypt", "false", ctx).equals("true") ? true : false;
		Select selector = new Select(conn);
		try {
			Session session = SessionManager.get().getSession(ctx, true);

			if (checkIdCode) {
				// 在验证码模式下，采用验证码作为key进行解码
				String loginCode = session.GetValue("login.code", "");

				if (loginCode == null || loginCode.length() <= 0) {
					throw new ServantException("user.login_failed", "Can not find login code.");
				}

				// 验证成功，验证码失效
				session.del("login.code");

				if (isEncrypt) {
					password = encrypter.decode(password, loginCode);
				} else {
					String _loginCode = getArgument("loginCode", ctx);
					if (!loginCode.equals(_loginCode)) {
						throw new ServantException("user.login_failed", "The login code is not correct.");
					}
				}
			} else {
				// 在非验证码模式下，采用用户名作为key进行解码
				if (isEncrypt) {
					password = encrypter.decode(password, loginId);
				}
			}

			Map<String, String> result = null;
			if ("manager".equals(role)) {
				result = selector.execute(sqlQueryManagerInfo, loginId).singleRowAsString();
			} else if ("teacher".equals(role)) {
				result = selector.execute(sqlQueryTeacherInfo, loginId).singleRowAsString();
			} else if ("student".equals(role)) {
				result = selector.execute(sqlQueryStudentInfo, loginId).singleRowAsString();
			}
			if (result == null) {
				throw new ServantException("user.login_failed", "Can not find a valid user.");
			}

			String _password = result.get("pwd");
			// 数据库中的密码是通过密码+用户ID进行MD5加密的
			password = md5Coder.encode(password, loginId);

			if (!password.equals(_password)) {
				throw new ServantException("user.login_failed", "Password is not correct.");
			}

			// 登录成功
			long loginTime = System.currentTimeMillis();

			session.hSet("user", "id", loginId + "@" + role);
			session.hSet("user", "loginType", role);
			session.hSet("user", "loginId", loginId);
			session.hSet("user", "loginTime", String.valueOf(loginTime));
			session.hSet("user", "fromIp", ctx.getClientIp());

			bizLog(conn, loginId, ctx.getClientIp(), loginId, ctx);
		} catch (Exception ex) {
			bizLog(conn, loginId, ctx.getClientIp(), loginId, "用户" + loginId + "登录失败:" + ex.getMessage());
			throw ex;
		} finally {
			Select.close(selector);
		}
	}

}
