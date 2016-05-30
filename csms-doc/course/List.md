# 教务员查看全部课程列表

## 样例

下面是一个成功查看的样例：
```url
http://localhost:9009/services/csms/course/List
```

输出结果：
```
{
    "duration": "6",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464524228275bPCkH5B",
    "host": "0:0:0:0:0:0:0:1:9009",
    "course": [
        {
            "updateDate": "2016-05-22 13:45:02.0",
            "courseSize": 200,
            "teacherNo": "10000",
            "courseRestrictionGrade": "1,2,4",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "语言文化",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "PASSED",
            "courseEnrollment": 2,
            "id": 401,
            "deadline": "2016-07-01 00:00:00.0",
            "applyTime": "A5,A6,B4,E8",
            "createDate": "2016-05-29 14:28:08.0"
        },
        {
            "updateDate": "2016-05-22 13:45:35.0",
            "courseSize": 160,
            "teacherNo": "10002",
            "courseRestrictionGrade": "1,2,4",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "语言文化",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "REJECTED",
            "courseEnrollment": 0,
            "id": 501,
            "deadline": "2016-07-01 00:00:00.0",
            "applyTime": "A5,A6,B4,E8",
            "createDate": "2016-05-28 19:05:03.0"
        },
        {
            "updateDate": "2016-05-22 13:45:02.0",
            "courseSize": 2,
            "teacherNo": "10000",
            "courseRestrictionGrade": "1,2",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "语言文化",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "PASSED",
            "courseEnrollment": 0,
            "id": 601,
            "deadline": "2016-07-01 00:00:00.0",
            "applyTime": "A1,A2,B1,E1",
            "createDate": "2016-05-28 19:05:03.0"
        },
        {
            "updateDate": "2016-05-22 13:45:02.0",
            "courseSize": 2,
            "teacherNo": "10000",
            "courseRestrictionGrade": "1,2,3,4",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "语言文化",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "PASSED",
            "courseEnrollment": 2,
            "id": 701,
            "deadline": "2016-07-01 00:00:00.0",
            "applyTime": "A1,A2,B1,E1",
            "createDate": "2016-05-29 14:30:49.0"
        },
        {
            "updateDate": "2016-05-22 17:15:08.0",
            "courseSize": 160,
            "teacherNo": "10002",
            "courseRestrictionGrade": "1,2,4",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "时间重复测试",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "PASSED",
            "courseEnrollment": 0,
            "id": 1201,
            "deadline": "2016-07-01 00:00:00.0",
            "applyTime": "E8",
            "createDate": "2016-05-28 19:05:03.0"
        },
        {
            "updateDate": "2015-05-23 10:18:01.0",
            "courseSize": 160,
            "teacherNo": "10003",
            "courseRestrictionGrade": "1,2,4",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "时间冲突测试",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "PENDING",
            "courseEnrollment": 0,
            "id": 1301,
            "deadline": "2016-07-01 00:00:00.0",
            "applyTime": "C1,C2",
            "createDate": "2016-05-28 19:05:03.0"
        },
        {
            "updateDate": "2016-05-28 22:44:44.0",
            "courseSize": 3,
            "teacherNo": "",
            "courseRestrictionGrade": "1,2,4",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "Japanese History",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "PENDING",
            "courseEnrollment": 0,
            "id": 1901,
            "deadline": "2016-01-01 00:00:00.0",
            "applyTime": "A5,A6,B4,E8",
            "createDate": "2016-05-28 22:44:44.0"
        },
        {
            "updateDate": "2016-05-29 19:24:06.0",
            "courseSize": 3,
            "teacherNo": "",
            "courseRestrictionGrade": "1,2",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "Korean History",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "PENDING",
            "courseEnrollment": 0,
            "id": 2401,
            "deadline": "2016-01-01 00:00:00.0",
            "applyTime": "C1,C2,C3,C4",
            "createDate": "2016-05-29 19:24:06.0"
        }
    ]
}
```

下面是一个教务员查看某教师开设的课程的样例：
```
url
http://localhost:9009/services/csms/course/List?teacherNo=10002
```

输出结果：
```
{
    "duration": "5",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464536721257vgy5eu3",
    "host": "0:0:0:0:0:0:0:1:9009",
    "course": [
        {
            "updateDate": "2016-05-22 13:45:35.0",
            "courseSize": 160,
            "teacherNo": "10002",
            "courseRestrictionGrade": "1,2,4",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "语言文化",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "REJECTED",
            "courseEnrollment": 0,
            "id": 501,
            "deadline": "2016-07-01 00:00:00.0",
            "applyTime": "A5,A6,B4,E8",
            "createDate": "2016-05-28 19:05:03.0"
        },
        {
            "updateDate": "2016-05-22 17:15:08.0",
            "courseSize": 160,
            "teacherNo": "10002",
            "courseRestrictionGrade": "1,2,4",
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseName": "时间重复测试",
            "courseCredits": 3,
            "coursePeriod": 64,
            "courseStatus": "PASSED",
            "courseEnrollment": 0,
            "id": 1201,
            "deadline": "2016-07-01 00:00:00.0",
            "applyTime": "E8",
            "createDate": "2016-05-28 19:05:03.0"
        }
    ]
}
```