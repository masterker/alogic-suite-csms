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
import com.logicbus.dbcp.sql.DBTools;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 学生浏览已审核通过的未选课程列表
 * 
 * @author limf
 */
public class BrowseCourse extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {

		// 服务权限判断
		Session session = SessionManager.get().getSession(ctx, false);
		String role = session == null ? "anonymous" : session.hGet("user", "loginType", "anonymous");
		if (!"student".equals(role)) {
			throw new ServantException("core.unauthorized", role + "用户无权访问本服务");
		}

		// String studentNo = ctx.GetValue("studentNo", "");
		String studentNo = getArgument("studentNo", ctx);

		sqlCourseQuery = "SELECT c.course_id AS id,c.course_no AS courseNo,c.course_name AS courseName,t.teacher_name AS teacherName,c.course_size AS courseSize,c.course_enrollment AS courseEnrollment,c.course_restriction_grade AS courseRestrictionGrade,course_restriction_major AS courseRestrictionMajor,c.course_credits AS courseCredits,c.course_period AS coursePeriod FROM course c JOIN teacher t ON c.teacher_no=t.teacher_no WHERE c.course_status='PASSED' AND c.course_id NOT IN(SELECT course_id FROM student_course_list WHERE student_no="
				+ studentNo + ")";

		List<Map<String, Object>> courseResult = DBTools.listAsObject(conn, sqlCourseQuery);
		List<Map<String, Object>> finalCourseResult = new ArrayList<Map<String, Object>>();

		for (Map<String, Object> course : courseResult) {
			String courseId = course.get("id").toString();
			sqlRoomQuery = "SELECT cr.room_time AS roomTime,r.campus AS campus,r.building AS building,r.room_no AS roomNo FROM course_room_list cr JOIN classroom r ON cr.room_id=r.room_id WHERE cr.course_id="
					+ courseId;

			List<Map<String, Object>> roomResult = DBTools.listAsObject(conn, sqlRoomQuery);
			List<Map<String, Object>> finalRoomResult = new ArrayList<Map<String, Object>>();

			for (Map<String, Object> room : roomResult) {
				String roomTime = room.get("roomTime").toString();
				String campus = room.get("campus").toString();
				String building = room.get("building").toString();
				String roomNo = room.get("roomNo").toString();
				String roomDetail = roomTime + "@" + campus + "-" + building + "-" + roomNo;
				room.put("roomDetail", roomDetail);
				finalRoomResult.add(room);
			}
			course.put("roomDetails", finalRoomResult);
			finalCourseResult.add(course);
		}

		msg.getRoot().put(rootName, finalCourseResult);
	}

	protected String sqlRoomQuery = "";

	protected String rootName = "data";

	protected String sqlCourseQuery = "";
	// protected String sqlCourseQuery = "SELECT c.course_id AS id,c.course_no
	// AS courseNo,c.course_name AS courseName,t.teacher_name AS
	// teacherName,c.course_size AS courseSize,c.course_enrollment AS
	// courseEnrollment,c.course_restriction_grade AS
	// courseRestrictionGrade,course_restriction_major AS
	// courseRestrictionMajor,c.course_credits AS courseCredits,c.course_period
	// AS coursePeriod FROM course c JOIN teacher t ON c.teacher_no=t.teacher_no
	// WHERE c.course_status='PASSED'";
	// protected String sqlCourseQuery = "SELECT c.course_id AS id,c.course_no
	// AS courseNo,c.course_name AS courseName,t.teacher_name AS
	// teacherName,c.course_size AS courseSize,c.course_enrollment AS
	// courseEnrollment,c.course_restriction_grade AS
	// courseRestrictionGrade,course_restriction_major AS
	// courseRestrictionMajor,c.course_credits AS courseCredits,c.course_period
	// AS coursePeriod FROM course c JOIN teacher t ON c.teacher_no=t.teacher_no
	// WHERE c.course_status='PASSED' AND c.course_id NOT IN(SELECT course_id
	// FROM student_course_list WHERE student_no=2012002002)";
}
