
# 学生评教

## 输入参数

| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | | student_course_id |

## 样例

下面是一个成功评教的样例：

服务地址如下：
```url
http://localhost:9009/services/csms/student/EvaluateCourse?id=2301&grade=70
```

输出结果：
```
{
    "duration": "83",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464503692435gfDahtI",
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

