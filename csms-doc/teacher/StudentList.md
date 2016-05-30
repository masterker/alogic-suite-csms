# 教师查看选课学生列表

## 输入参数

| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | courseId | String | | course_id |

## 样例

下面是一个成功查看选课学生列表的样例：
```url
http://localhost:9009/services/csms/teacher/StudentList?courseId=701
```

输出结果：
```
{
    "duration": "1",
    "reason": "It is successful",
    "code": "core.ok",
    "student": [
        {
            "studentNo": "2012002002",
            "studentGrade": "4",
            "studentGender": "M",
            "studentMajor": "Foreign Language and Literature",
            "studentName": "Adam Rippion"
        },
        {
            "studentNo": "2013001004",
            "studentGrade": "3",
            "studentGender": "M",
            "studentMajor": "Chinese Language and Literature",
            "studentName": "Joushua Farris"
        }
    ],
    "serial": "14645218094259eIqqSJ",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```