# 教师提交成绩

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | | student_course_list |
| 2 | grade | String | | course_grade |


## 样例

下面是一个成功提交成绩的样例：
```url
http://localhost:9009/services/csms/teacher/RecordCourseGrade?id=2301&grade=85
```

输出结果：
```
{
    "duration": "16",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464522089200v0cMfmC",
    "host": "0:0:0:0:0:0:0:1:9009",
    "studentCourse": {
        "updateDate": "1464522089000",
        "courseGrade": "85",
        "studentNo": "2013001004",
        "id": "2301",
        "evaluationGrade": "70",
        "courseId": "701",
        "createDate": "1464522089000"
    }
}
```
