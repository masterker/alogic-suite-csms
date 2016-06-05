# 删除学生

## 输入参数
| 编号 | 代码 | 类型 | 名称 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | id | String | 学号 | 必传 |

#样例
下面是一个成功新增学生的样例：
```url
http://localhost:9009/services/csms/student/Delete?id=2017000000
```

输出结果：
```
{
    "duration": "254",
    "host": "0:0:0:0:0:0:0:1:9009",
    "reason": "It is successful",
    "code": "core.ok",
    "serial": "787FMUISI6"
}
```
