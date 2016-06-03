package edu.fdu.csms.service.teacher;

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
 * 教师查看选课学生列表
 * 
 * @author limf
 */
public class ListStudentByCourse extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {
		String courseId = getArgument("courseId", ctx);

		sqlQuery = "SELECT sc.student_course_id AS id,sc.course_grade AS courseGrade,s.student_no AS studentNo,s.student_name AS studentName,s.student_gender AS studentGender,s.student_grade AS studentGrade,s.student_major AS studentMajor FROM student_course_list sc JOIN student s ON sc.student_no = s.student_no WHERE sc.course_id = "
				+ courseId;

		processor = new Preprocessor(sqlQuery);

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
