package edu.fdu.csms.service.course;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.alogic.cache.core.CacheStore;
import com.alogic.cache.core.MultiFieldObject;
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
 * 审核课程
 * 
 * @author limf
 */
public class Pass extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		sqlUpdate = PropertiesConstants.getString(p, "sql.Update", sqlUpdate);
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
		dataId = PropertiesConstants.getString(p, "dataGuard.id", dataId);
		processor = new Preprocessor(sqlUpdate);
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {
		String userId = getArgument("user.id", "", ctx);
		String id = getArgument("id", ctx);
		String courseNo = getArgument("courseNo", ctx);
		if (StringUtils.isEmpty(courseNo)) {
			throw new ServantException("core.data_not_found", "审核课程请先输入课程代码！");
		}
		String dataGuardObject = getArgument(dataId, id, ctx);
		if (!checkPrivilege(userId, dataGuardObject)) {
			throw new ServantException("core.unauthorized", "无权访问本服务，用户:" + userId);
		}

		// 写入课程时间、地点
		String courseDetail = getArgument("courseDetail", ctx);
		String courseRoomId[] = courseDetail.split(",");
		for (String d : courseRoomId) {
			String updateSql = "UPDATE course_room_list SET idle=0, course_id=" + id + " WHERE course_room_id=" + d;
			DBTools.update(conn, updateSql);
		}

		List<Object> data = new ArrayList<Object>();
		String sql = processor.process(ctx, data);

		if (data.size() > 0) {
			DBTools.update(conn, sql, data.toArray());
		} else {
			DBTools.update(conn, sql);
		}

		clearCache(id);

		CacheStore cache = getCacheStore();

		MultiFieldObject found = cache.get(id, true);
		if (found != null) {
			Map<String, Object> output = new HashMap<String, Object>();
			found.toJson(output);
			msg.getRoot().put(rootName, output);
		}

		bizLog(conn, userId, ctx.getClientIp(), id, ctx);
	}

	protected String sqlUpdate = "";

	protected Preprocessor processor = null;

	protected String rootName = "data";

	protected String dataId = "id";
}
