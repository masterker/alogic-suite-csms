# 驳回课程

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | 驳回ID | course_id |

## 样例

下面是一个成功驳回课程的样例：
```url
http://localhost:9009/services/csms/course/Reject?id=2404
```

输出结果：
```
{
    "duration": "4",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464531850617JVRzEBp",
    "host": "0:0:0:0:0:0:0:1:9009",
    "course": {
        "updateDate": "1464531850000",
        "courseSize": "30",
        "teacherNo": "",
        "courseRestrictionGrade": "1,2",
        "courseRestrictionMajor": "Computer and Science,Software",
        "courseCredits": "3",
        "coursePeriod": "64",
        "name": "Digital Signal",
        "courseEnrollment": "0",
        "id": "2404",
        "deadline": "2016-01-01 00:00:00.0",
        "applyTime": "C1,C2,E7,E8",
        "status": "REJECTED",
        "createDate": "1464531850000"
    }
}
```

