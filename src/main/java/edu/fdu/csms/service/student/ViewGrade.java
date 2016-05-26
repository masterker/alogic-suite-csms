package edu.fdu.csms.service.student;

import java.util.HashMap;
import java.util.Map;

import com.alogic.cache.core.CacheStore;
import com.alogic.cache.core.MultiFieldObject;
import com.alogic.idu.util.Base;
import com.anysoft.util.Properties;
import com.anysoft.util.PropertiesConstants;
import com.logicbus.backend.Context;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.message.JsonMessage;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 学生查看成绩
 * 
 * @author limf
 */
public class ViewGrade extends Base {
	protected String rootName = "data";

	@Override
	protected void onCreate(ServiceDescription sd, Properties p) throws ServantException {
		rootName = PropertiesConstants.getString(p, "data.root", rootName);
	}

	@Override
	protected int onJson(Context ctx, JsonMessage msg) throws Exception {
		String id = getArgument("id", ctx);

		CacheStore cache = getCacheStore();

		MultiFieldObject found = cache.get(id, true);
		if (found == null) {
			throw new ServantException("core.data_not_found", "Can not find object,id=" + id);
		}

		Map<String, Object> data = new HashMap<String, Object>();

		found.toJson(data);

		String evaluationGrade = (String) data.get("evaluationGrade");

		if (evaluationGrade == null || "0".equals(evaluationGrade)) {
			throw new ServantException("core.data_error", "查看成绩之前请先评教！");
		}

		msg.getRoot().put(rootName, data);
		return 0;
	}
}
