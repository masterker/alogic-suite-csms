# 登录

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | loginId | String | 登录ID | student_id或teacher_id或manager_id |
| 2 | pwd | String | 密码 | |
| 3 | loginCode | String | 验证码 | 
| 4 | role | String | 角色 | student或teacher或manager |


#样例
下面是一个验证码输错的样例：
```url
http://localhost:9009/services/csms/login/Login?loginId=10002&pwd=112233&loginCode=if8r&role=teacher
```

输出结果：
```
{
    "duration": "634",
    "reason": "The login code is not correct.",
    "code": "user.login_failed",
    "serial": "1464529786654lnOWzQW",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```

下面是一个密码输错的样例：
```url
http://localhost:9009/services/csms/login/Login?loginId=10002&pwd=123456&loginCode=if8r&role=teacher
```

输出结果：
```
{
    "duration": "7",
    "reason": "Can not find login code.",
    "code": "user.login_failed",
    "serial": "1464530312718B8OPuz0",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```

下面是一个成功登录的样例：
```url
http://localhost:9009/services/csms/login/Login?loginId=10002&pwd=112233&loginCode=wjus&role=teacher
```

输出结果：
```
{
    "duration": "4",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464530661221h2eWJXb",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```
