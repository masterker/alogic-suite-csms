# /login/LoginCode

## 概述

获取一个新的验证码图片。

验证码图片要求如下：
* 包含4个随机字符，包含数字和大小字母；
* 图片宽80像素，高26像素；
* 图片包含40条随机干扰线；

生成的随机字符保存在id为login.code的Session数据中。

服务的路径如下：
```
/login/LoginCode
```

## 更新历史

 - [20160526 limf] 创建本文档。
 
<hr>

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | ignoreCase | Boolean | 是否忽略大小写 | 是否忽略大小写,缺省为true |


## 输入文档
无

## 输出文档

输出为image/jpeg文档。

## 异常
略

## 样例

下面是一个样例，
服务地址如下；
```url
http://localhost:9009/services/csms/login/LoginCode
```

## 实现

### 服务配置
本服务的服务配置如下：
```xml
        <service 
			id = "LoginCode" 
			name="LoginCode" 
			note="登录验证码" 
			visible="public" 
			log = "brief" 
			module="edu.fdu.csms.service.login.LoginCode">
			<properties>
				<parameter id="servant.maxActive" value="100"/>
				<parameter id="servant.maxIdle" value="10"/>
			</properties>
		</service>
```

### 实现模块
本服务的实现模块为edu.fdu.csms.service.login.LoginCode。

### 相关数据库
无

### 数据源
无

### 业务日志
本服务属于查询服务，不记录服务日志。

### 权限项
无