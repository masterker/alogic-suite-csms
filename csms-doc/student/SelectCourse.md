# 学生选课

## 输入参数

| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | courseId | String | 课程ID | 对应数据库中的course_id |
| 2 | studentNo | String | 学生学号 | 对应数据库中的student_no |

## 样例

下面是一个年级限制的样例：

服务地址如下：
```url
http://localhost:9009/services/csms/student/SelectCourse?courseId=401&studentNo=2013008003
```

输出结果：
```
{
    "duration": "98",
    "reason": "你的所属年级不允许选择该课程！",
    "code": "core.data_error",
    "serial": "1464436849692ti6dpRN",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```

下面是一个专业限制的样例：

服务地址如下：
```url
http://localhost:9009/services/csms/student/SelectCourse?courseId=401&studentNo=2012003004
```

输出结果：
```
{
    "duration": "1",
    "reason": "你的所属专业不允许选择该课程！",
    "code": "core.data_error",
    "serial": "1464441572658wwIilVb",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```


下面是一个人数限制的样例：

服务地址如下：
```url
http://localhost:9009/services/csms/student/SelectCourse?courseId=701&studentNo=2013001004
```

输出结果：
```
{
    "duration": "2",
    "reason": "课程人数达到上限!",
    "code": "core.data_error",
    "serial": "1464501552604z80ob8B",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```

下面是一个重复选课的样例：

服务地址如下：
```url
http://localhost:9009/services/csms/student/SelectCourse?courseId=701&studentNo=2013001004
```

输出结果：
```
{
    "duration": "2",
    "reason": "请勿重复选课！",
    "code": "core.data_error",
    "serial": "14645204038257BVO4HK",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```


下面是一个成功选课的样例：

服务地址如下：
```url
http://localhost:9009/services/csms/student/SelectCourse?courseId=701&studentNo=2012002002
```

输出结果：
```
{
    "duration": "112",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "14644450486823sRwNRm",
    "host": "0:0:0:0:0:0:0:1:9009",
    "studentCourse": {
        "updateDate": "1464445048000",
        "courseGrade": "0",
        "studentNo": "2012002002",
        "id": "1801",
        "evaluationGrade": "0",
        "courseId": "701",
        "createDate": "1464445048000"
    }
}
```


