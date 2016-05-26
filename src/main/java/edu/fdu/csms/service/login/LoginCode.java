package edu.fdu.csms.service.login;

import java.awt.Font;
import java.util.Random;

import com.anysoft.util.Properties;
import com.anysoft.util.PropertiesConstants;
import com.logicbus.backend.Context;
import com.logicbus.backend.Servant;
import com.logicbus.backend.ServantException;
import com.logicbus.backend.Session;
import com.logicbus.backend.SessionManager;
import com.logicbus.backend.message.CodeImage;
import com.logicbus.models.servant.ServiceDescription;

/**
 * 登录验证码服务
 * 
 * @author limf
 */
public class LoginCode extends Servant {

	/**
	 * 验证码字符个数,可通过参数text.chars配置,缺省4个字符
	 */
	protected int charNumbers = 4;

	/**
	 * 验证码图片宽度(像素点),可通过参数image.width配置,缺省80个像素
	 */
	protected int imageWidth = 80;

	/**
	 * 验证码图片高度(像素点)，可通过参数image.height配置，缺省26个像素
	 */
	protected int imageHeight = 26;

	/**
	 * 干扰线条数,可通过参数line.disturbance配置,缺省40条
	 */
	protected int disturbanceLines = 40;

	/**
	 * 字体，可通过参数text.font配置，缺省为Fixedsys
	 */
	protected Font font = null;

	/**
	 * 是否忽略大小写,可通过text.ignoreCase配置，缺省为true
	 */
	protected boolean ignoreCase = true;

	public void create(ServiceDescription sd) throws ServantException {
		super.create(sd);

		Properties p = sd.getProperties();
		charNumbers = PropertiesConstants.getInt(p, "text.chars", charNumbers, true);
		imageWidth = PropertiesConstants.getInt(p, "image.width", imageWidth, true);
		imageHeight = PropertiesConstants.getInt(p, "image.height", imageHeight, true);
		disturbanceLines = PropertiesConstants.getInt(p, "line.disturbance", disturbanceLines, true);
		font = new Font(PropertiesConstants.getString(p, "text.font", "Fixedsys", true), Font.CENTER_BASELINE, 18);
		ignoreCase = PropertiesConstants.getBoolean(p, "text.ignoreCase", ignoreCase, true);
	}

	@Override
	public int actionProcess(Context ctx) throws Exception {
		// 采用CodeImage消息
		CodeImage msg = (CodeImage) ctx.asMessage(CodeImage.class);

		String codes = ramdomCodes(4);
		msg.code(codes);
		msg.width(imageWidth);
		msg.height(imageHeight);
		msg.disturbanceLines(disturbanceLines);
		msg.font(font);

		boolean _ignoreCase = getArgument("ignoreCase", Boolean.toString(ignoreCase), ctx).equals("true") ? true
				: false;

		// 记录到Session
		{
			Session session = SessionManager.get().getSession(ctx, true);
			session.SetValue("login.code", _ignoreCase ? codes.toLowerCase() : codes);
		}

		return 0;
	}

	/**
	 * 验证码的字符集
	 */
	private static final char[] codes = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
			'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
			'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4',
			'5', '6', '7', '8', '9' };

	/**
	 * 随机生成指定字符个数的字符串
	 * 
	 * @param _width
	 *            字符个数
	 * @return 随机字符串
	 */
	protected static String ramdomCodes(int _width) {
		int width = _width <= 0 ? 4 : _width;
		char[] ret = new char[width];
		Random ran = new Random();
		int length = codes.length;
		for (int i = 0; i < width; i++) {
			int intValue = ran.nextInt(length) % length;
			ret[i] = codes[intValue];
		}
		return new String(ret);
	}
}
