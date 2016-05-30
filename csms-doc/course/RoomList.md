# 查询指定时间可用教室列表

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | roomTime | String | 教室空闲时间 |  |


## 样例

下面是回一个成功查询的样例：
```url
http://localhost:9009/services/csms/course/RoomList?roomTime=A5
```

输出结果：
```
{
    "duration": "4",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "14645321914289SE1BL4",
    "host": "0:0:0:0:0:0:0:1:9009",
    "room": [
        {
            "id": 5,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 401,
            "roomId": 10000
        },
        {
            "id": 60,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10001
        },
        {
            "id": 115,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10002
        },
        {
            "id": 170,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10003
        },
        {
            "id": 225,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10004
        },
        {
            "id": 280,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10005
        },
        {
            "id": 335,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10007
        },
        {
            "id": 390,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10008
        },
        {
            "id": 445,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10009
        },
        {
            "id": 500,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10010
        },
        {
            "id": 555,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10011
        },
        {
            "id": 610,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10013
        },
        {
            "id": 665,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10014
        },
        {
            "id": 720,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10015
        },
        {
            "id": 775,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10016
        },
        {
            "id": 830,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10018
        },
        {
            "id": 885,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10019
        },
        {
            "id": 940,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10020
        },
        {
            "id": 995,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10021
        },
        {
            "id": 1050,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10022
        },
        {
            "id": 1105,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10024
        },
        {
            "id": 1160,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10025
        },
        {
            "id": 1215,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10026
        },
        {
            "id": 1270,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10027
        },
        {
            "id": 1325,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10028
        },
        {
            "id": 1380,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10029
        },
        {
            "id": 1435,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10031
        },
        {
            "id": 1490,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10032
        },
        {
            "id": 1545,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10033
        },
        {
            "id": 1600,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10034
        },
        {
            "id": 1655,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10035
        },
        {
            "id": 1710,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10036
        },
        {
            "id": 1765,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10037
        },
        {
            "id": 1820,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10038
        },
        {
            "id": 1875,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10039
        },
        {
            "id": 1930,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10040
        },
        {
            "id": 1985,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10041
        },
        {
            "id": 2040,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10042
        },
        {
            "id": 2095,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10043
        },
        {
            "id": 2150,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10044
        },
        {
            "id": 2205,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10047
        },
        {
            "id": 2260,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10048
        },
        {
            "id": 2315,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10049
        },
        {
            "id": 2370,
            "roomTime": "A5",
            "idle": "1",
            "courseId": 0,
            "roomId": 10050
        }
    ]
}
```
