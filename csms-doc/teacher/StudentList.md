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
    "duration": "124",
    "host": "127.0.0.1:9009",
    "student": [
        {
            "studentName": "Adam Rippion",
            "id": 1103,
            "studentNo": "2012002002",
            "studentGender": "M",
            "courseGrade": 59,
            "studentMajor": "Foreign Language and Literature",
            "studentGrade": "4"
        },
        {
            "studentName": "Jessie Chan",
            "id": 1404,
            "studentNo": "2014002004",
            "studentGender": "F",
            "courseGrade": 0,
            "studentMajor": "Foreign Language and Literature",
            "studentGrade": "1"
        }
    ],
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "0NW3P0ESBL"
}
```