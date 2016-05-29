package edu.fdu.csms.service.student;

import java.sql.Connection;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alogic.cache.context.CacheSource;
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
 * 学生退课
 * 
 * @author limf
 */
public class DropCourse extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		courseCacheId = PropertiesConstants.getString(p, "cache.course.id", courseCacheId);
		sqlUpdate = PropertiesConstants.getString(p, "sql.Update", sqlUpdate);
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
		dataId = PropertiesConstants.getString(p, "dataGuard.id", dataId);
		processor = new Preprocessor(sqlUpdate);
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {
		String userId = getArgument("user.id", "", ctx);
		String id = getArgument("id", ctx);
		String dataGuardObject = getArgument(dataId, id, ctx);
		if (!checkPrivilege(userId, dataGuardObject)) {
			throw new ServantException("core.unauthorized", "无权访问本服务，用户:" + userId);
		}

		String courseId = getArgument("courseId", ctx);
		Timestamp deadline = null;
		Integer courseEnrollment = 0;
		CacheStore courseCache = getCacheStore(courseCacheId);
		MultiFieldObject courseFound = courseCache.get(courseId, true);
		if (courseFound != null) {
			Map<String, Object> course = new HashMap<String, Object>();
			courseFound.toJson(course);
			deadline = Timestamp.valueOf((String) course.get("deadline"));
			courseEnrollment = Integer.parseInt((String) course.get("courseEnrollment"));
		}

		if (System.currentTimeMillis() > deadline.getTime()) {
			throw new ServantException("core.data_error", "退课时间已过！");
		}

		List<Object> data = new ArrayList<Object>();
		String sql = processor.process(ctx, data);

		if (data.size() > 0) {
			DBTools.update(conn, sql, data.toArray());
		} else {
			DBTools.update(conn, sql);
		}

		// courseEnrollment减1
		courseEnrollment--;
		String updateCourseEnrollmentSql = "UPDATE course SET course_enrollment=" + courseEnrollment
				+ " WHERE course_id=" + courseId;
		DBTools.update(conn, updateCourseEnrollmentSql);
		clearCache(courseCacheId, courseId);

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

	protected CacheStore getCacheStore(String cacheId) {
		if (isNull(cacheId)) {
			throw new ServantException("core.cache_not_defined", "The relational cache is not defined" + cacheId);
		}
		CacheSource cs = CacheSource.get();

		CacheStore store = cs.get(cacheId);

		if (store == null) {
			throw new ServantException("core.cache_not_found", "The cache is not found,customCacheId=" + cacheId);
		}
		return store;
	}

	/**
	 * 在相关缓存中清除指定的对象
	 * 
	 * @param cacheId
	 *            缓存ID
	 * @param id
	 *            对象ID
	 */
	protected void clearCache(String cacheId, String id) {
		if (!isNull(cacheId)) {
			CacheSource cs = CacheSource.get();

			CacheStore store = cs.get(cacheId);

			if (store != null) {
				store.expire(id);
			}
		}
	}

	protected String sqlUpdate = "";

	protected Preprocessor processor = null;

	protected String rootName = "data";

	protected String dataId = "id";

	protected String courseCacheId = "";
}
