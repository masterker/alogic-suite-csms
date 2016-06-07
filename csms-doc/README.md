csms readme
===================

fdu-csms为复旦大学数据库课程大作业--高校选课管理系统。

主要功能有：

* 教务员

	*基本信息维护
	
	*开设课程
	
	*修改课程
	
	*查看所有课程
	
	*查看学生的选课情况

* 教师

	*基本信息维护
	
	*开设课程
	
	*查看选课名单
	
	*提交成绩

* 学生

	*基本信息维护
	
	*选课
	
	*退课
	
	*查看所选课程
	
	*查看成绩
	
	*评教

项目源码解读：

- 服务配置
	+ conf目录，配置文件的根目录；
	+ servant目录，服务配置文件目录，用于配置restful服务的环境变量；
	+ acm.xml，访问控制器模块指向；
	+ cache.source.xml，缓存配置文件，将核心业务数据以<K,V>结构缓存到系统中，减少对数据库的访问，增加效率；
	+ dbcp.source.xml，数据库连接池配置；
	+ seq.xml，通过Mysql维护全局唯一序列，用于对不支持自增的表进行主键赋值；
	+ servant.catalog.xml，restful服务路径配置；
	+ settings.xml，配置入口文件，指向具体配置文件位置。
	
- 后台代码
	+ default package
		App.java，引导类，配合settings.xml将配置文件转化为java文件可访问的位置；
	+ ac package
		SessionAccessController，基于登录会话的访问控制器，用于控制客户端对服务器访问的权限以及最大并发数；
	+ service package
		后台业务的核心逻辑控制以及复杂数据库操作并转化为系统缓存；
	+ session package
		CachedSessionManager，基于缓存的会话管理器，用于存放登录用户信息，对用户进行服务访问权限判断；
	+ util package 工具包
		BatchAddCourseRoom，将教室和课程节次排列组合成为可用单元存入数据库；
		TransformPwd，将静态表中的用户密码进行批量MD5加密。
		
- 前端页面
	+ assembly-make-alogic.xml和WEB-INF
		maven工程打包为WEB应用的配置文件和安全目录；


更新历史：

- 1.0.0 [20160526 limf]
	+ 初次发布;
