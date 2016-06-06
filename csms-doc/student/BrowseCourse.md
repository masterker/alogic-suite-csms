# 学生浏览已审核通过的未选课程列表

## 样例

下面是一个成功浏览已审核通过的未选课程列表的样例：
```url
http://localhost:9009/services/csms/student/BrowseCourse?studentNo=2012002002
```

输出结果：
```
{
    "course": [
        {
            "id": 401,
            "courseRestrictionGrade": "1,2,4",
            "coursePeriod": 64,
            "roomDetails": [
                {
                    "roomNo": "2101",
                    "roomTime": "A5",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "A5@Handan-No.2 Teaching Building-2101",
                    "campus": "Handan"
                },
                {
                    "roomNo": "2101",
                    "roomTime": "A6",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "A6@Handan-No.2 Teaching Building-2101",
                    "campus": "Handan"
                },
                {
                    "roomNo": "2104",
                    "roomTime": "D1",
                    "building": "No.2 Teaching Building ",
                    "roomDetail": "D1@Zhangjiang-No.2 Teaching Building -2104",
                    "campus": "Zhangjiang"
                }
            ],
            "courseNo": "111",
            "courseCredits": 3,
            "courseSize": 22,
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseEnrollment": 180,
            "teacherName": "Lori Nichol",
            "courseName": "语言文化"
        },
        {
            "id": 501,
            "courseRestrictionGrade": "1,2,4",
            "coursePeriod": 64,
            "roomDetails": [],
            "courseNo": "",
            "courseCredits": 3,
            "courseSize": 88,
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseEnrollment": 10,
            "teacherName": "Shae-lynn Bourne",
            "courseName": "语言文化"
        },
        {
            "id": 1201,
            "courseRestrictionGrade": "1,2,4",
            "coursePeriod": 64,
            "roomDetails": [
                {
                    "roomNo": "2102",
                    "roomTime": "D1",
                    "building": "No.2 Teaching Building ",
                    "roomDetail": "D1@Zhangjiang-No.2 Teaching Building -2102",
                    "campus": "Zhangjiang"
                }
            ],
            "courseNo": "",
            "courseCredits": 3,
            "courseSize": 111,
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseEnrollment": 1,
            "teacherName": "Shae-lynn Bourne",
            "courseName": "时间重复测试"
        },
        {
            "id": 1301,
            "courseRestrictionGrade": "1,2,4",
            "coursePeriod": 64,
            "roomDetails": [
                {
                    "roomNo": "2101",
                    "roomTime": "A1",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "A1@Handan-No.2 Teaching Building-2101",
                    "campus": "Handan"
                },
                {
                    "roomNo": "2101",
                    "roomTime": "C1",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "C1@Handan-No.2 Teaching Building-2101",
                    "campus": "Handan"
                },
                {
                    "roomNo": "2101",
                    "roomTime": "D11",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "D11@Handan-No.2 Teaching Building-2101",
                    "campus": "Handan"
                },
                {
                    "roomNo": "2102",
                    "roomTime": "C2",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "C2@Handan-No.2 Teaching Building-2102",
                    "campus": "Handan"
                }
            ],
            "courseNo": "",
            "courseCredits": 3,
            "courseSize": 888,
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseEnrollment": 9,
            "teacherName": "Jeffery Buttle",
            "courseName": "时间冲突测试"
        },
        {
            "id": 2401,
            "courseRestrictionGrade": "1,2,3,4",
            "coursePeriod": 64,
            "roomDetails": [
                {
                    "roomNo": "2102",
                    "roomTime": "A1",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "A1@Handan-No.2 Teaching Building-2102",
                    "campus": "Handan"
                },
                {
                    "roomNo": "2102",
                    "roomTime": "B1",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "B1@Handan-No.2 Teaching Building-2102",
                    "campus": "Handan"
                }
            ],
            "courseNo": "noTest1",
            "courseCredits": 3,
            "courseSize": 160,
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseEnrollment": 1,
            "teacherName": "Shae-lynn Bourne",
            "courseName": "语言文化"
        },
        {
            "id": 2402,
            "courseRestrictionGrade": "1,2,3,4",
            "coursePeriod": 64,
            "roomDetails": [
                {
                    "roomNo": "2103",
                    "roomTime": "A1",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "A1@Handan-No.2 Teaching Building-2103",
                    "campus": "Handan"
                },
                {
                    "roomNo": "2103",
                    "roomTime": "C1",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "C1@Handan-No.2 Teaching Building-2103",
                    "campus": "Handan"
                }
            ],
            "courseNo": "noTest2",
            "courseCredits": 3,
            "courseSize": 160,
            "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
            "courseEnrollment": 0,
            "teacherName": "Jeffery Buttle",
            "courseName": "语言文化aa"
        }
    ],
    "duration": "95",
    "host": "0:0:0:0:0:0:0:1:9009",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "XQUWPVMU3H"
}
```