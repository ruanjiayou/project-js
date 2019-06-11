# 组合API功能
> 此功能已废弃.

```txt
请求url
http://127.0.0.1:3000/v1/api-group
请求头
Content-Type: application/json
x-api: group
请求数据body:
[
  {"method": "put", "url": "/test/put", "query":{},"body": {"test":"test"}},
  {"method": "get", "url": "/test/test", "query":{},"body": {}},
  {"method": "get", "url": "/api-404", "query":{},"body": {}}
]
请求结果:
[
  {
    "test": "test"
  },
  {
    "state": "fail",
    "ecode": -1,
    "error": "API路径错误"
  },
  {
    "state": "fail",
    "ecode": -1,
    "error": "API路径错误"
  }
]
```

所有的请求测试都在routes/test.js文件中

```txt
特点:
  1.超灵活的路由写法,支持组合API(涉及文件的要注意name区分). { 'get /v1/admin/self': async(req,res,next)=>{} }
  2.强大的参数过滤. validater-max(人性化的功能,method/default/format/empty/required/nullable/nonzero/)
  3.总体设计一般般,毕竟出道才2年.
  4.大部分配置在项目启动时从数据库中取得
```
