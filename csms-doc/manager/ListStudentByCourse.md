# 教务员查看选课学生列表

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | courseId | String | 课程ID | |

#样例
下面是一个成功查看的样例：
```url
http://localhost:9009/services/csms/manager/StudentList?courseId=401
```

输出结果：
```
{
    "duration": "53",
    "host": "0:0:0:0:0:0:0:1:9009",
    "reason": "It is successful",
    "studentCourse": [
        {
            "courseGrade": 59,
            "studentName": "Adam Rippion",
            "evaluationGrade": 88
        },
        {
            "courseGrade": 0,
            "studentName": "Jessie Chan",
            "evaluationGrade": 0
        }
    ],
    "code": "core.ok",
    "serial": "14646811063834l0TQys"
}
```
