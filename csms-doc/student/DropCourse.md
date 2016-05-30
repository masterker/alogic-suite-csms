# 学生退课

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | | student_course_id |
| 2 | courseId | String | | course_id |

## 样例

下面是一个成功退课的样例：

服务地址如下：
```url
http://localhost:9009/services/csms/student/DropCourse?id=2202&courseId=701
```

输出结果：
```
{
    "duration": "2",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "1464502430448WYOyDsx",
    "host": "0:0:0:0:0:0:0:1:9009"
}
```


