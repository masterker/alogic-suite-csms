package edu.fdu.csms.service.student;

import java.sql.Connection;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alogic.cache.context.CacheSource;
import com.alogic.cache.core.CacheStore;
import com.alogic.cache.core.MultiFieldObject;
import com.alogic.idu.util.IDUBase;
import com.alogic.sequence.client.SeqTool;
import com.anysoft.util.Properties;
import com.anysoft.util.PropertiesConstants;
import com.logicbus.backend.Context;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.dbcp.processor.Preprocessor;
import com.logicbus.dbcp.sql.DBTools;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 学生选课
 * 
 * @author limf
 */
public class SelectCourse extends IDUBase {

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		courseCacheId = PropertiesConstants.getString(p, "cache.course.id", courseCacheId);
		studentCacheId = PropertiesConstants.getString(p, "cache.student.id", studentCacheId);
		sqlInsert = PropertiesConstants.getString(p, "sql.Insert", sqlInsert);
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
		dataId = PropertiesConstants.getString(p, "dataGuard.id", dataId);
		processor = new Preprocessor(sqlInsert);
	}

	@Override
	protected void doIt(Context ctx, JsonMessage msg, Connection conn) throws Exception {

		long seqId = SeqTool.nextLong("studentCourseId");
		String studentCourseId = Long.toString(seqId);

		String userId = getArgument("user.id", "", ctx);

		String id = studentCourseId;
		ctx.SetValue("id", studentCourseId);

		String dataGuardObject = getArgument(dataId, id, ctx);
		if (!checkPrivilege(userId, dataGuardObject)) {
			throw new ServantException("core.unauthorized", "无权访问本服务，用户:" + userId);
		}

		// 获取课程人数、年级和专业限制
		String courseId = getArgument("courseId", ctx);
		Timestamp deadline = null;
		Integer courseSize = 0;
		Integer courseEnrollment = 0;
		String courseRestrictionGrade = "";
		String courseRestrictionMajor = "";
		CacheStore courseCache = getCacheStore(courseCacheId);
		MultiFieldObject courseFound = courseCache.get(courseId, true);
		if (courseFound != null) {
			Map<String, Object> course = new HashMap<String, Object>();
			courseFound.toJson(course);
			courseSize = Integer.parseInt((String) course.get("courseSize"));
			courseEnrollment = Integer.parseInt((String) course.get("courseEnrollment"));
			deadline = Timestamp.valueOf((String) course.get("deadline"));
			courseRestrictionGrade = (String) course.get("courseRestrictionGrade");
			courseRestrictionMajor = (String) course.get("courseRestrictionMajor");
		}

		if (System.currentTimeMillis() > deadline.getTime()) {
			throw new ServantException("core.data_error", "选课时间已过！");
		}

		// 获取学生年级和专业
		String studentNo = getArgument("studentNo", ctx);
		String studentGrade = "";
		String studentMajor = "";
		CacheStore studentCache = getCacheStore(studentCacheId);
		MultiFieldObject studentFound = studentCache.get(studentNo, true);
		if (studentFound != null) {
			Map<String, Object> student = new HashMap<String, Object>();
			studentFound.toJson(student);
			studentGrade = (String) student.get("grade");
			studentMajor = (String) student.get("major");
		}

		// 获取courseId list
		String courseListSql = "SELECT course_id AS courseId from student_course_list WHERE student_no =" + studentNo;
		List<Map<String, Object>> courseListResult = DBTools.listAsObject(conn, courseListSql);
		for (Map<String, Object> course : courseListResult) {
			String _courseId = course.get("courseId").toString();
			if (courseId.equals(_courseId)) {
				throw new ServantException("core.data_error", "请勿重复选课！");
			}
		}

		if (!(courseEnrollment < courseSize)) {
			throw new ServantException("core.data_error", "课程人数达到上限！");
		}

		// 判断选课年级和专业限制
		String[] courseRestrictionGrades = courseRestrictionGrade.split(",");
		if (!Arrays.asList(courseRestrictionGrades).contains(studentGrade)) {
			throw new ServantException("core.data_error", "你的所属年级不允许选择该课程！");
		}
		String[] courseRestrictionMajors = courseRestrictionMajor.split(",");
		if (!Arrays.asList(courseRestrictionMajors).contains(studentMajor)) {
			throw new ServantException("core.data_error", "你的所属专业不允许选择该课程！");
		}

		// 判断选课时间冲突限制
		String roomTimeListSql = "SELECT room_time AS time FROM course_room_list WHERE course_id =" + courseId;
		List<Map<String, Object>> roomTimeListResult = DBTools.listAsObject(conn, roomTimeListSql);
		for (Map<String, Object> roomTime : roomTimeListResult) {
			String time = roomTime.get("time").toString();
			String judgeSql = "SELECT COUNT(room_time) FROM course_room_list WHERE course_id IN(SELECT course_id AS courseId from student_course_list WHERE student_no ="
					+ studentNo + ") AND room_time='" + time + "'";
			int timeCount = 0;
			timeCount = DBTools.selectAsInt(conn, judgeSql, 0);
			if (timeCount >= 1) {
				throw new ServantException("core.data_error", "选课时间冲突，请检查课程表！");
			}
		}

		CacheStore cache = getCacheStore();

		MultiFieldObject found = cache.get(id, true);
		if (found != null) {
			throw new ServantException("core.data_exists", "The object exists,id=" + id);
		}

		List<Object> data = new ArrayList<Object>();
		String sql = processor.process(ctx, data);

		if (data.size() > 0) {
			DBTools.insert(conn, sql, data.toArray());
		} else {
			DBTools.insert(conn, sql);
		}

		// courseEnrollment加1
		courseEnrollment++;
		String updateCourseEnrollmentSql = "UPDATE course SET course_enrollment=" + courseEnrollment
				+ " WHERE course_id=" + courseId;
		DBTools.update(conn, updateCourseEnrollmentSql);
		clearCache(courseCacheId, courseId);

		found = cache.get(id, true);
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

	protected String sqlInsert = "";

	protected Preprocessor processor = null;

	protected String rootName = "data";

	protected String dataId = "id";

	protected String courseCacheId = "";

	protected String studentCacheId = "";

	protected String timeCountSql = "";

}