# 审核课程

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | | course_id |
| 2 | size | String | 课程人数 | course_size |
| 3 | resGrade | String | 年级限制 | course_restriction_grade |
| 4 | resMajor | String | 专业限制 | course_restriction_major |
| 5 | courseNo | String | 课程代码 | course_no |
| 6 | courseDetail | String | 课程教室 | |

## 样例

下面是一个审核成功的样例：
```url
http://localhost:9009/services/csms/course/Pass?id=2501&courseDetail=19,20&courseNo=COMP0005
```

输出结果：
```
{
    "duration": "51",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464594531081EwrIM7m",
    "host": "0:0:0:0:0:0:0:1:9009",
    "course": {
        "no": "COMP0005",
        "updateDate": "1464594531000",
        "courseSize": "30",
        "teacherNo": "10003",
        "courseRestrictionGrade": "2,3",
        "courseRestrictionMajor": "Computer and Science,Software",
        "courseCredits": "3",
        "coursePeriod": "64",
        "name": "HCI",
        "courseEnrollment": "0",
        "id": "2501",
        "deadline": "2016-07-01 00:00:00.0",
        "applyTime": "B8,B9",
        "status": "PASSED",
        "createDate": "1464594531000"
    }
}
```

下面是一个审核课程且修改size和resGrade和resMajor的样例：
```url
http://localhost:9009/services/csms/course/Pass?id=2601&courseDetail=14,15,40,41&courseNo=COMP0006&size=35&resGrade=3,4&resMajor=Software
```

输出结果：
```
{
    "duration": "6",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464595028012SVNT6Le",
    "host": "0:0:0:0:0:0:0:1:9009",
    "course": {
        "no": "COMP0006",
        "updateDate": "1464595028000",
        "courseSize": "35",
        "teacherNo": "10000",
        "courseRestrictionGrade": "3,4",
        "courseRestrictionMajor": "Software",
        "courseCredits": "3",
        "coursePeriod": "64",
        "name": "Data Structure",
        "courseEnrollment": "0",
        "id": "2601",
        "deadline": "2016-07-01 00:00:00.0",
        "applyTime": "B3,B4,D7,D8",
        "status": "PASSED",
        "createDate": "1464595028000"
    }
}
```


