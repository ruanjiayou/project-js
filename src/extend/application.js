const { scanner } = require('errors-code');

const routes = [];
const mounts = {};

module.exports = {
  // 应用所有配置
  get config() {
    return global.CFG;
  },
  // 路由数组
  get routes() {
    return routes;
  },
  // 加载路由文件
  get loadRoutes() {
    return require('../router');
  },
  // 加载业务错误码
  get errorsCode() {
    return scanner(this.config.ERRORS_CODE_PATH);
  },
  // 挂载路由
  dispatch(cb) {
    let app = this;
    app.routes.forEach((route) => {
      app[route.type](route.path, async function (req, res, next) {
        try {
          if (req.route && cb) {
            cb.call(app, req);
          }
          const result = await route.handle.call(app, req, res, next);
          res.format(result);
        } catch (e) {
          next(e);
        }
      });
    });
  },
};