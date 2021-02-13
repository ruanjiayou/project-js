# changelog

## 2021-02-03
- route的loader改为function生成，这样可以传入app参数。每次不用取this，可以用箭头函数
- utils不挂在app上了，没必要
- response 辅助函数可以直接json()
  ```
  路由return不起其他特殊作用了
  直接res.success()，调用了res.json()，返回undefined，format()里直接跳过
  return object,format()判断不为undefined,调用res.json()
  ```