# 新增学生

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | name | String | 学生姓名 | 必传 |
| 2 | gender | String | 性别 | |
| 3 | grade | String | 年级 | |
| 4 | major | String | 专业 | |

#样例
下面是一个成功新增学生的样例：
```url
http://localhost:9009/services/csms/student/New?name=studentNew
```

输出结果：
```
{
    "duration": "226",
    "host": "0:0:0:0:0:0:0:1:9009",
    "student": {
        "id": "2016000000",
        "name": "studentNew",
        "gender": "M",
        "grade": "1",
        "createDate": "1464699449000",
        "password": "d5ltOXj0E6/LBlxdR2EPTA==",
        "updateDate": "1464699449000",
        "major": "Chinese Language and Literature"
    },
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "14646994499835zbtWBI"
}
```
