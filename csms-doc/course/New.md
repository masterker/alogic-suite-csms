# 教师开设课程

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | teacherNo | String | 教师NO | teacher_no |
| 2 | courseName | String | 课程名称 | course_name |
| 3 | courseSize | String | 课程人数 | course_size |
| 4 | courseCredits | String | 课程学分 | course_credits |
| 5 | coursePeriod | String | 课程学时 | course_period |
| 6 | applyTime | String | 上课时间 | apply_time |
| 7 | courseRestrictionGrade | 可选课年级 | |
| 8 | courseRestrictionMajor | 可选课专业 | |


## 样例

下面是一个成功开设课程的样例；
```url
http://localhost:9009/services/csms/course/New?teacherId=10001&courseName=Korean%20History&courseSize=3&courseCredits=3&coursePeriod=64&applyTime=C1,C2,C3,C4&courseRestrictionGrade=1,2&courseRestrictionMajor=Chinese%20Language%20and%20Literature,Foreign%20Language%20and%20Literature
```

输出结果：
```
{
    "duration": "24",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464521046240yA6yCOh",
    "host": "0:0:0:0:0:0:0:1:9009",
    "course": {
        "updateDate": "1464521046000",
        "courseSize": "3",
        "teacherNo": "",
        "courseRestrictionGrade": "1,2",
        "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
        "courseCredits": "3",
        "coursePeriod": "64",
        "name": "Korean History",
        "courseEnrollment": "0",
        "id": "2401",
        "deadline": "2016-01-01 00:00:00.0",
        "applyTime": "C1,C2,C3,C4",
        "status": "PENDING",
        "createDate": "1464521046000"
    }
}
```
