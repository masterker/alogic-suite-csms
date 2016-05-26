// 包路径
package edu.fdu.csms.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

// 依赖的类
import com.anysoft.util.code.Coder;
import com.anysoft.util.code.CoderFactory;

// 类名
public class TransformPwd {

	// 入口方法
	public static void main(String[] args) {

		try {
			// 调用写入加密密码方法
			writePwdIntoMariaDB();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		/**
		 * // 声明两个用来加密和解密的coder，加密方式分别为DES3和MD5 Coder des3Coder =
		 * CoderFactory.newCoder("DES3"); Coder md5Coder =
		 * CoderFactory.newCoder("MD5");
		 * 
		 * // 这是要加密的密码 String pwd = "112233";
		 * 
		 * // 密码用字符串"1"以DES3方式加密 String des3Pwd = des3Coder.encode(pwd, "1"); //
		 * 控制台打印加密后的密码 System.out.println("加密后的des3Pwd===" + des3Pwd); //
		 * 控制台打印解密后的密码 System.out.println("解密后的pwd====" +
		 * des3Coder.decode(des3Pwd, "1"));
		 * 
		 * // // 密码用字符串"10001"以MD5方式加密 String md5Pwd = md5Coder.encode(pwd,
		 * "10004"); // 控制台打印加密后的密码 System.out.println("加密后的md5Pwd===" +
		 * md5Pwd); // 控制台打印解密后的密码 System.out.println("解密后的pwd====" +
		 * md5Coder.decode(md5Pwd, "1"));
		 */

	}

	// 给密码pwd用盐salt加密（MD5加密方式）
	public static String encryptPwd(String pwd, String salt) throws Exception {
		Coder md5Coder = CoderFactory.newCoder("MD5");
		return md5Coder.encode(pwd, salt);
	}

	// 写入加密密码
	public static void writePwdIntoMariaDB() throws Exception {

		Connection conn = getConn();

		// 查询student表中所有学生学号
		String sql = "select student_no as no from student";

		// 为对应学生更新加密后的密码
		String sql1 = "update student s set s.student_password = ? where s.student_no = ?;";

		PreparedStatement pstmt;
		PreparedStatement pstmt1;

		try {
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt1 = (PreparedStatement) conn.prepareStatement(sql1);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				String no = rs.getString("no");
				String encryptPwd = encryptPwd("123456", no);
				pstmt1.setString(1, encryptPwd);
				pstmt1.setString(2, no);
				pstmt1.addBatch();
			}
			pstmt1.executeBatch(); // insert remaining records
			pstmt1.close();
			// 写入成功后在控制台打印信息
			System.out.println("success!!!");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

		}

	}

	// 获取jdbc连接
	private static Connection getConn() {
		String driver = "org.mariadb.jdbc.Driver";
		String url = "jdbc:mariadb://localhost:3306/csms";
		String username = "root";
		String password = "P@ssw0rd";
		Connection conn = null;
		try {
			Class.forName(driver); // classLoader,加载对应驱动
			conn = (Connection) DriverManager.getConnection(url, username, password);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}

}
