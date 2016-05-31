# 修改密码

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | oldPwd | String | 原密码 | |
| 2 | newPwd | String | 新密码 | |
| 3 | code | String | 验证码 | 


#样例
下面是一个成功修改密码的样例：
```url
http://localhost:9009/services/csms/login/ChangePwd?oldPwd=123456&newPwd=888888&code=yiaq
```

输出结果：
```
{
    "duration": "109",
    "host": "0:0:0:0:0:0:0:1:9009",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464680113327KKedeRQ"
}
```
