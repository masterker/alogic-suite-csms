package com.alogic.csms.util;

import com.anysoft.util.code.Coder;
import com.anysoft.util.code.CoderFactory;

public class TransformPwd {

	public static void main(String[] args) {

		Coder des3Coder = CoderFactory.newCoder("DES3");
		Coder md5Coder = CoderFactory.newCoder("MD5");

		String pwd = "123123";

		String des3Pwd = des3Coder.encode(pwd, "1");
		System.out.println("des3Pwd===" + des3Pwd);
		System.out.println("pwd====" + des3Coder.decode(des3Pwd, "1"));

		String md5Pwd = md5Coder.encode(pwd, "10001");
		System.out.println("md5Pwd===" + md5Pwd);
		System.out.println("pwd====" + md5Coder.decode(md5Pwd, "1"));

	}

}
