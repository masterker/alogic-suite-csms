# 教务员查看学生选课列表

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | studentNo | String | 学生学号 | |

#样例
下面是一个成功查看的样例：
```url
http://localhost:9009/services/csms/manager/CourseList?studentNo=2012002002
```

输出结果：
```
{
    "duration": "74",
    "host": "0:0:0:0:0:0:0:1:9009",
    "reason": "It is successful",
    "studentCourse": [
        {
            "courseNo": "111",
            "evaluationGrade": 88,
            "courseId": 401,
            "courseGrade": 59,
            "courseName": "语言文化"
        },
        {
            "courseNo": "",
            "evaluationGrade": 0,
            "courseId": 1301,
            "courseGrade": 0,
            "courseName": "时间冲突测试"
        }
    ],
    "code": "core.ok",
    "serial": "14646811201316vJoFbp"
}
```
