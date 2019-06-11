module.exports = {
  // 获取存储策略
  get store() {
    return require('./localStorage');
  },
  // 自动遍历文件夹
  get loader() {
    return require('./loader');
  },
  // IO相关封装
  get utils() {
    return require('./utils');
  },
  // 流操作相关方法
  get stream() {
    return require('./steam');
  },
  // 日志封装
  get logger() {
    return require('./logger');
  },
  // excel简单解析和创建
  get excel() {
    return require('./excel');
  },
  // 定时器
  get schedule() {
    return require('./schedule');
  }
};