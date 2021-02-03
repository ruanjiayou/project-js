# changelog

## 2021-02-03
- route的loader改为function生成，这样可以传入app参数。每次不用取this，可以用箭头函数
- utils不挂在app上了，没必要
- response 辅助函数可以直接json(),不需要多余的return