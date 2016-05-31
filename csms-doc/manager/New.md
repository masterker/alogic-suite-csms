# 新增教务员

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | 教务员工号 | |
| 2 | name | String | 教务员姓名 | |
| 3 | password | String | 登录密码 | |

#样例
下面是一个成功新增教务员的样例：
```url
http://localhost:9009/services/csms/manager/New?id=10002&name=managerNew&password=000000
```

输出结果：
```
{
    "duration": "172",
    "host": "0:0:0:0:0:0:0:1:9009",
    "manager": {
        "id": "10002",
        "name": "managerNew",
        "createDate": "1464698533000",
        "password": "LsCetiwat4SJ4E6H3x14gA==",
        "updateDate": "1464698533000"
    },
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464698534004xYEGXDe"
}
```
