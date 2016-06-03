# 查询指定时间可用教室列表

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | roomTime | String | 教室空闲时间 |  |


## 样例

下面是回一个成功查询的样例：
```url
http://localhost:9009/services/csms/course/RoomList?roomTime=E11
```

输出结果：
```
{
    "duration": "119",
    "host": "0:0:0:0:0:0:0:1:9009",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "U1NCZ1NTH0",
    "room": [
        {
            "id": 55,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building",
            "roomName": "Handan-No.2 Teaching Building-2101",
            "roomNo": "2101",
            "roomId": 10000,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 110,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building",
            "roomName": "Handan-No.2 Teaching Building-2102",
            "roomNo": "2102",
            "roomId": 10001,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 165,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building",
            "roomName": "Handan-No.2 Teaching Building-2103",
            "roomNo": "2103",
            "roomId": 10002,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 220,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building",
            "roomName": "Handan-No.2 Teaching Building-2104",
            "roomNo": "2104",
            "roomId": 10003,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 275,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building",
            "roomName": "Handan-No.2 Teaching Building-2201",
            "roomNo": "2201",
            "roomId": 10004,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 330,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building",
            "roomName": "Handan-No.2 Teaching Building-2202",
            "roomNo": "2202",
            "roomId": 10005,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 385,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.3 Teaching Building",
            "roomName": "Handan-No.3 Teaching Building-3101",
            "roomNo": "3101",
            "roomId": 10007,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 440,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.3 Teaching Building",
            "roomName": "Handan-No.3 Teaching Building-3102",
            "roomNo": "3102",
            "roomId": 10008,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 495,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.3 Teaching Building",
            "roomName": "Handan-No.3 Teaching Building-3103",
            "roomNo": "3103",
            "roomId": 10009,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 550,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.3 Teaching Building",
            "roomName": "Handan-No.3 Teaching Building-3201",
            "roomNo": "3201",
            "roomId": 10010,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 605,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.3 Teaching Building",
            "roomName": "Handan-No.3 Teaching Building-3202",
            "roomNo": "3202",
            "roomId": 10011,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 660,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.3 Teaching Building",
            "roomName": "Handan-No.3 Teaching Building-3301",
            "roomNo": "3301",
            "roomId": 10013,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 715,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.4 Teaching Building",
            "roomName": "Handan-No.4 Teaching Building-4101",
            "roomNo": "4101",
            "roomId": 10014,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 770,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.4 Teaching Building",
            "roomName": "Handan-No.4 Teaching Building-4102",
            "roomNo": "4102",
            "roomId": 10015,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 825,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.4 Teaching Building",
            "roomName": "Handan-No.4 Teaching Building-4103",
            "roomNo": "4103",
            "roomId": 10016,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 880,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.4 Teaching Building",
            "roomName": "Handan-No.4 Teaching Building-4105",
            "roomNo": "4105",
            "roomId": 10018,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 935,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.4 Teaching Building",
            "roomName": "Handan-No.4 Teaching Building-4201",
            "roomNo": "4201",
            "roomId": 10019,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 990,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.4 Teaching Building",
            "roomName": "Handan-No.4 Teaching Building-4202",
            "roomNo": "4202",
            "roomId": 10020,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1045,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.5 Teaching Building",
            "roomName": "Handan-No.5 Teaching Building-5101",
            "roomNo": "5101",
            "roomId": 10021,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1100,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.5 Teaching Building",
            "roomName": "Handan-No.5 Teaching Building-5102",
            "roomNo": "5102",
            "roomId": 10022,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1155,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.5 Teaching Building",
            "roomName": "Handan-No.5 Teaching Building-5201",
            "roomNo": "5201",
            "roomId": 10024,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1210,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.5 Teaching Building",
            "roomName": "Handan-No.5 Teaching Building-5202",
            "roomNo": "5202",
            "roomId": 10025,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1265,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.5 Teaching Building",
            "roomName": "Handan-No.5 Teaching Building-5301",
            "roomNo": "5301",
            "roomId": 10026,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1320,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.5 Teaching Building",
            "roomName": "Handan-No.5 Teaching Building-5302",
            "roomNo": "5302",
            "roomId": 10027,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1375,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.6 Teaching Building",
            "roomName": "Handan-No.6 Teaching Building-6101",
            "roomNo": "6101",
            "roomId": 10028,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1430,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.6 Teaching Building",
            "roomName": "Handan-No.6 Teaching Building-6102",
            "roomNo": "6102",
            "roomId": 10029,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1485,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.6 Teaching Building",
            "roomName": "Handan-No.6 Teaching Building-6202",
            "roomNo": "6202",
            "roomId": 10031,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1540,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.6 Teaching Building",
            "roomName": "Handan-No.6 Teaching Building-6203",
            "roomNo": "6203",
            "roomId": 10032,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1595,
            "roomTime": "E11",
            "idle": "1",
            "building": "Guanghua Building",
            "roomName": "Handan-Guanghua Building-GHX101",
            "roomNo": "GHX101",
            "roomId": 10033,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1650,
            "roomTime": "E11",
            "idle": "1",
            "building": "Guanghua Building",
            "roomName": "Handan-Guanghua Building-GHX102",
            "roomNo": "GHX102",
            "roomId": 10034,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1705,
            "roomTime": "E11",
            "idle": "1",
            "building": "Guanghua Building",
            "roomName": "Handan-Guanghua Building-GHX103",
            "roomNo": "GHX103",
            "roomId": 10035,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1760,
            "roomTime": "E11",
            "idle": "1",
            "building": "Guanghua Building",
            "roomName": "Handan-Guanghua Building-GHD101",
            "roomNo": "GHD101",
            "roomId": 10036,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1815,
            "roomTime": "E11",
            "idle": "1",
            "building": "Guanghua Building",
            "roomName": "Handan-Guanghua Building-GHD102",
            "roomNo": "GHD102",
            "roomId": 10037,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1870,
            "roomTime": "E11",
            "idle": "1",
            "building": "Guanghua Building",
            "roomName": "Handan-Guanghua Building-GHD103",
            "roomNo": "GHD103",
            "roomId": 10038,
            "courseId": 0,
            "campus": "Handan"
        },
        {
            "id": 1925,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.1 Teaching Building ",
            "roomName": "Jiangwan-No.1 Teaching Building -1101",
            "roomNo": "1101",
            "roomId": 10039,
            "courseId": 0,
            "campus": "Jiangwan"
        },
        {
            "id": 1980,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.1 Teaching Building ",
            "roomName": "Jiangwan-No.1 Teaching Building -1102",
            "roomNo": "1102",
            "roomId": 10040,
            "courseId": 0,
            "campus": "Jiangwan"
        },
        {
            "id": 2035,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.1 Teaching Building ",
            "roomName": "Jiangwan-No.1 Teaching Building -1103",
            "roomNo": "1103",
            "roomId": 10041,
            "courseId": 0,
            "campus": "Jiangwan"
        },
        {
            "id": 2090,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.1 Teaching Building ",
            "roomName": "Jiangwan-No.1 Teaching Building -1201",
            "roomNo": "1201",
            "roomId": 10042,
            "courseId": 0,
            "campus": "Jiangwan"
        },
        {
            "id": 2145,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.1 Teaching Building ",
            "roomName": "Jiangwan-No.1 Teaching Building -1202",
            "roomNo": "1202",
            "roomId": 10043,
            "courseId": 0,
            "campus": "Jiangwan"
        },
        {
            "id": 2200,
            "roomTime": "E11",
            "idle": "1",
            "building": "Computer Building ",
            "roomName": "Zhangjiang-Computer Building -C101",
            "roomNo": "C101",
            "roomId": 10044,
            "courseId": 0,
            "campus": "Zhangjiang"
        },
        {
            "id": 2255,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building ",
            "roomName": "Zhangjiang-No.2 Teaching Building -2101",
            "roomNo": "2101",
            "roomId": 10047,
            "courseId": 0,
            "campus": "Zhangjiang"
        },
        {
            "id": 2310,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building ",
            "roomName": "Zhangjiang-No.2 Teaching Building -2102",
            "roomNo": "2102",
            "roomId": 10048,
            "courseId": 0,
            "campus": "Zhangjiang"
        },
        {
            "id": 2365,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building ",
            "roomName": "Zhangjiang-No.2 Teaching Building -2103",
            "roomNo": "2103",
            "roomId": 10049,
            "courseId": 0,
            "campus": "Zhangjiang"
        },
        {
            "id": 2420,
            "roomTime": "E11",
            "idle": "1",
            "building": "No.2 Teaching Building ",
            "roomName": "Zhangjiang-No.2 Teaching Building -2104",
            "roomNo": "2104",
            "roomId": 10050,
            "courseId": 0,
            "campus": "Zhangjiang"
        }
    ]
}
```
