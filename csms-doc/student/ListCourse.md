# 查询指定学生所选课程列表

## 样例

下面是一个成功查询指定学生所选课程列表的样例：
```url
http://localhost:9009/services/csms/student/ListCourse?studentNo=2012002002
```

输出结果：
```
{
    "course": [
        {
            "courseGrade": 59,
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
                    "roomNo": "3102",
                    "roomTime": "B5",
                    "building": "No.3 Teaching Building",
                    "roomDetail": "B5@Handan-No.3 Teaching Building-3102",
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
            "courseNo": "haha",
            "courseCredits": 3,
            "evaluationGrade": 88,
            "courseId": 401,
            "studentCourseId": 1103,
            "teacherName": "Lori Nichol",
            "courseName": "语言文化"
        },
        {
            "courseGrade": -2,
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
                    "roomTime": "D11",
                    "building": "No.2 Teaching Building",
                    "roomDetail": "D11@Handan-No.2 Teaching Building-2101",
                    "campus": "Handan"
                }
            ],
            "courseNo": "",
            "courseCredits": 3,
            "evaluationGrade": -1,
            "courseId": 1301,
            "studentCourseId": 1305,
            "teacherName": "Jeffery Buttle",
            "courseName": "时间冲突测试"
        }
    ],
    "duration": "11",
    "host": "0:0:0:0:0:0:0:1:9009",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "VQLUPKSI59"
}
```