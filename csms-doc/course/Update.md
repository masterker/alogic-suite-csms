# 更新课程信息

## 输入参数

| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | | course_id |
| 2 | size | String | | course_size |
| 3 | courseNo | String | | course_no |
| 4 | resGrade | String | | course_restriction_grade |
| 5 | resMajor | String | | course_restriction_major |

## 样例
下面是一个成功更新的样例：

服务地址如下：
```url
http://localhost:9009/services/csms/course/Update?id=2402&course_no=COMP0002&size=45&resGrade=1&resMajor=Foreign%20Language%20and%20Literature
```

输出结果：
```
{
    "duration": "4",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464591169239NNBHfIj",
    "host": "0:0:0:0:0:0:0:1:9009",
    "course": {
        "no": "COMP0001",
        "updateDate": "1464591169000",
        "courseSize": "45",
        "teacherNo": "10003",
        "courseRestrictionGrade": "1",
        "courseRestrictionMajor": "Foreign Language and Literature",
        "courseCredits": "3",
        "coursePeriod": "64",
        "name": "Database System",
        "courseEnrollment": "0",
        "id": "2402",
        "deadline": "2016-07-01 00:00:00.0",
        "applyTime": "B3,B4",
        "status": "PASSED",
        "createDate": "1464591169000"
    }
}
```


