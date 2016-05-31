# 新增教师

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | 教师工号 | |
| 2 | name | String | 教师姓名 | |
| 3 | password | String | 登录密码 | |

#样例
下面是一个成功新增教师查看的样例：
```url
http://localhost:9009/services/csms/teacher/New?id=10005&name=teacherNew&password=000000
```

输出结果：
```
{
    "duration": "267",
    "host": "0:0:0:0:0:0:0:1:9009",
    "reason": "It is successful",
    "code": "core.ok",
    "teacher": {
        "id": "10005",
        "name": "teacherNew",
        "createDate": "1464699259000",
        "password": "t7KGbP6PyI7WF2+nZmWaSQ==",
        "updateDate": "1464699259000"
    },
    "serial": "1464699259888umBGPiQ"
}
```
