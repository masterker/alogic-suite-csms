// 包路径
package com.alogic.csms.util;

// 依赖的类
import com.anysoft.util.code.Coder;
import com.anysoft.util.code.CoderFactory;

// 类名
public class TransformPwd {

	// 入口方法
	public static void main(String[] args) {

		// 声明两个用来加密和解密的coder，加密方式分别为DES3和MD5
		Coder des3Coder = CoderFactory.newCoder("DES3");
		Coder md5Coder = CoderFactory.newCoder("MD5");

		// 这是要加密的密码
		String pwd = "123123";

		// 密码用字符串"1"以DES3方式加密
		String des3Pwd = des3Coder.encode(pwd, "1");
		// 控制台打印加密后的密码
		System.out.println("加密后的des3Pwd===" + des3Pwd);
		// 控制台打印解密后的密码
		System.out.println("解密后的pwd====" + des3Coder.decode(des3Pwd, "1"));

		// // 密码用字符串"10001"以MD5方式加密
		String md5Pwd = md5Coder.encode(pwd, "10001");
		// 控制台打印加密后的密码
		System.out.println("加密后的md5Pwd===" + md5Pwd);
		// 控制台打印解密后的密码
		System.out.println("解密后的pwd====" + md5Coder.decode(md5Pwd, "1"));

	}

}
