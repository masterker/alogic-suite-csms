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
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.dbcp.processor.Preprocessor;
import com.logicbus.dbcp.sql.DBTools;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 查询指定学生所选课程列表
 * 
 * @author limf
 */
public class ListCourse extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {

		String studentNo = getArgument("studentNo", ctx);

		// sqlQuery = "SELECT sc.course_id as courseId,c.course_no as
		// courseNo,c.course_name as courseName,t.teacher_name as
		// teacherName,c.course_credits as courseCredits,c.course_period as
		// coursePeriod,cr.room_id as roomId,cr.room_time as roomTime FROM
		// student_course_list sc JOIN course c ON sc.course_id = c.course_id
		// JOIN teacher t ON c.teacher_no = t.teacher_no JOIN course_room_list
		// cr ON c.course_id = cr.course_id WHERE sc.student_no = "
		// + studentNo;

		sqlCourseQuery = "SELECT sc.student_course_id AS studentCourseId,c.course_id as courseId,c.course_no as courseNo,c.course_name as courseName,t.teacher_name as teacherName,c.course_credits as courseCredits,c.course_period as coursePeriod FROM student_course_list sc JOIN course c ON sc.course_id = c.course_id JOIN teacher t ON c.teacher_no = t.teacher_no WHERE sc.student_no ="
				+ studentNo;

		List<Map<String, Object>> courseResult = DBTools.listAsObject(conn, sqlCourseQuery);
		List<Map<String, Object>> finalCourseResult = new ArrayList<Map<String, Object>>();

		for (Map<String, Object> course : courseResult) {
			String courseId = course.get("courseId").toString();
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

	protected String rootName = "data";

	protected String sqlQuery = "";

	protected String sqlCourseQuery = "";

	protected String sqlRoomQuery = "";

	protected Preprocessor processor = null;
}
