
# 学生查看成绩

## 输入参数

| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | | student_course_id |


## 样例

下面是一个成功查看成绩的样例：
```url
http://localhost:9009/services/csms/student/ViewGrade?id=2301
```

输出结果：
```
{
    "duration": "1",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464503920738gUKRkok",
    "host": "0:0:0:0:0:0:0:1:9009",
    "studentCourse": {
        "updateDate": "1464503692000",
        "courseGrade": "0",
        "studentNo": "2013001004",
        "id": "2301",
        "evaluationGrade": "70",
        "courseId": "701",
        "createDate": "1464503692000"
    }
}
```
