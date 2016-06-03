package edu.fdu.csms.service.course;

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
 * 查询指定时间可用教室列表
 * 
 * @author limf
 */
public class RoomList extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
		// sqlQuery = PropertiesConstants.getString(p, "sql.Query", rootName);
		processor = new Preprocessor(sqlQuery);
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {

		String _roomTime = ctx.GetValue("roomTime", "");

		List<Object> data = new ArrayList<Object>();

		// String sql = processor.process(ctx, data);
		String sql = sqlQuery;
		List<Map<String, Object>> result = null;
		List<Map<String, Object>> newResult = new ArrayList<Map<String, Object>>();

		if (data.size() <= 0) {
			result = DBTools.listAsObject(conn, sql, _roomTime);
		} else {
			result = DBTools.listAsObject(conn, sql, _roomTime, data.toArray());
		}

		for (Map<String, Object> course : result) {
			String campus = course.get("campus").toString();
			String building = course.get("building").toString();
			String roomNo = course.get("roomNo").toString();
			String roomName = campus + "-" + building + "-" + roomNo;
			course.put("roomName", roomName);
			newResult.add(course);
		}

		msg.getRoot().put(rootName, newResult);
	}

	protected String rootName = "data";

	protected String sqlQuery = "SELECT cr.course_room_id AS id,cr.room_id AS roomId,cr.room_time AS roomTime,cr.idle AS idle,cr.course_id AS courseId, c.campus,c.building,c.room_no AS roomNo FROM course_room_list cr JOIN classroom c ON cr.room_id=c.room_id WHERE room_time =? AND idle ='1'";

	protected Preprocessor processor = null;
}
