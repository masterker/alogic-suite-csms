# 为课程分配教室

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | 分配教室ID | course_room_id |
| 2 | courseId | String | | course_id |

## 样例
下面是一个成功分配教室的样例：
```url
http://localhost:9009/services/csms/course/BindingRoom?id=23&courseId=2401
```

输出结果：
```
{
    "courseRoom": {
        "updateDate": "1464576897000",
        "roomTime": "C1",
        "idle": "0",
        "id": "23",
        "courseId": "2401",
        "roomId": "10000",
        "createDate": "1464576897000"
    },
    "duration": "27",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "146457689729541QoTlk",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```
