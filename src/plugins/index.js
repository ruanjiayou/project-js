module.exports = {
  // 获取存储策略
  get store() {
    return require('./localStorage');
  },
  // 自动遍历文件夹
  get loader() {
    return require('./loader');
  },
  // 流操作相关方法
  get stream() {
    return require('./steam');
  },
  // 日志封装
  get logger() {
    return require('./logger');
  },
  // 定时器
  schedule: require('./schedule'),
};