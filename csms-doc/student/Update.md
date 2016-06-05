# 修改学生信息

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | 学号 | 必传 |
| 2 | name | String | 学生姓名 |  |
| 3 | gender | String | 性别 |  |
| 4 | grade | String | 年级 |  |
| 5 | major | String | 专业 |  |

#样例
下面是一个成功新增学生的样例：
```url
http://localhost:9009/services/csms/student/Update?id=2017000000&name=eee&grade=4&gender=F
```

输出结果：
```
{
    "duration": "189",
    "host": "0:0:0:0:0:0:0:1:9009",
    "student": {
        "id": "2017000000",
        "name": "eee",
        "gender": "F",
        "grade": "4",
        "createDate": "1465135127000",
        "password": "BFzUURsqb4uC1cUQ0F8c4A==",
        "updateDate": "1465135127000",
        "major": "Chinese Language and Literature"
    },
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "MPUO9APLJM"
}
```
