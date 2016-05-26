package edu.fdu.csms.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BatchAddCourseRoom {

	public static void main(String[] args) {
		addBatch();
	}

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

	private static void addBatch() {
		Connection conn = getConn();
		String sql = "select * from classroom";
		String sql1 = "insert into course_room_list (room_id, room_time, idle) values (?, ?, ?)";
		PreparedStatement pstmt;
		PreparedStatement pstmt1;
		try {
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			pstmt1 = (PreparedStatement) conn.prepareStatement(sql1);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				if (rs.getInt("available") == 1) {
					for (int i = 1; i < 12; i++) {
						String roomTimeA = "A" + i;
						pstmt1.setInt(1, rs.getInt("room_id"));
						pstmt1.setString(2, roomTimeA);
						pstmt1.setInt(3, 1);
						pstmt1.addBatch();
					}

					for (int i = 1; i < 12; i++) {
						String roomTimeB = "B" + i;
						pstmt1.setInt(1, rs.getInt("room_id"));
						pstmt1.setString(2, roomTimeB);
						pstmt1.setInt(3, 1);
						pstmt1.addBatch();
					}

					for (int i = 1; i < 12; i++) {
						String roomTimeC = "C" + i;
						pstmt1.setInt(1, rs.getInt("room_id"));
						pstmt1.setString(2, roomTimeC);
						pstmt1.setInt(3, 1);
						pstmt1.addBatch();
					}

					for (int i = 1; i < 12; i++) {
						String roomTimeD = "D" + i;
						pstmt1.setInt(1, rs.getInt("room_id"));
						pstmt1.setString(2, roomTimeD);
						pstmt1.setInt(3, 1);
						pstmt1.addBatch();
					}

					for (int i = 1; i < 12; i++) {
						String roomTimeE = "E" + i;
						pstmt1.setInt(1, rs.getInt("room_id"));
						pstmt1.setString(2, roomTimeE);
						pstmt1.setInt(3, 1);
						pstmt1.addBatch();
					}
				}
				pstmt1.executeBatch(); // insert remaining records
				pstmt1.close();
				System.out.println("success!!!");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

		}
	}

}
