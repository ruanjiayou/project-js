const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const multer = require('multer');

// 全局异常
process.on('uncaughtException', (err) => {
  console.error(err);
});
process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

// 全局变量 
require('dotenv').config({ path: '../.env' });
require('../config/config.default');
require(`../config/config.${process.env.NODE_ENV}`);

/**
 * '_events',
 * '_eventsCount',
 * '_maxListeners',
 * 'setMaxListeners',
 * 'getMaxListeners',
 * 'emit',
 * 'addListener',
 * 'on',
 * 'prependListener',
 * 'once',
 * 'prependOnceListener',
 * 'removeListener',
 * 'off',
 * 'removeAllListeners',
 * 'listeners',
 * 'rawListeners',
 * 'listenerCount',
 * 'eventNames',
 * 'init',
 * 'defaultConfiguration',
 * 'lazyrouter',
 * 'handle',
 * 'use',
 * 'route',
 * 'engine',
 * 'param',
 * 'set',
 * 'path',
 * 'enabled',
 * 'disabled',
 * 'enable',
 * 'disable',
 * 'acl',
 * 'bind',
 * 'checkout',
 * 'connect',
 * 'copy',
 * 'delete',
 * 'get',
 * 'head',
 * 'link',
 * 'lock',
 * 'm-search',
 * 'merge',
 * 'mkactivity',
 * 'mkcalendar',
 * 'mkcol',
 * 'move',
 * 'notify',
 * 'options',
 * 'patch',
 * 'post',
 * 'propfind',
 * 'proppatch',
 * 'purge',
 * 'put',
 * 'rebind',
 * 'report',
 * 'search',
 * 'source',
 * 'subscribe',
 * 'trace',
 * 'unbind',
 * 'unlink',
 * 'unlock',
 * 'unsubscribe',
 * 'all',
 * 'del',
 * 'render',
 * 'listen',
 * 'request',
 * 'response',
 * 'cache',
 * 'engines',
 * 'settings',
 * 'locals',
 * 'mountpath'
 */
app.extend = function (obj, bind = false) {
  for (let fn in obj) {
    app[fn] = obj[fn];
    if (typeof obj[fn] === 'function' && bind) {
      app[fn].bind(this);
    }
  }
};

app.extend(require('./utils/index'));
app.extend(require('./extend/application'), true);
app.loadRoutes(__dirname + '/routes');

app.run = async function (cb) {
  // 实例中的
  require('dotenv').config({ path: this.config.ROOT_PATH + '/.env' });
  require(`${this.config.CONFIG_PATH}/config.default`);
  require(`${this.config.CONFIG_PATH}/config.${process.env.NODE_ENV}`);
  // .安全部分
  this.use(helmet());

  // .请求日志
  this.use(require('./middlewares/access').bind(this));

  // .跨域处理
  this.use(require('./middlewares/cors').bind(this));

  // .静态目录
  this.use(express.static(this.config.STATIC_PATH));

  // .请求限制的处理
  this.use(express.json({ limit: this.config.UPLOAD.fileSize }));
  this.use(compression());

  // .解析请求
  this.use(cookieParser());
  this.use(bodyParser.json({ limit: this.config.UPLOAD.fileSize }));
  this.use(bodyParser.urlencoded({ limit: this.config.UPLOAD.fileSize, extended: true }));

  // .国际化
  this.use(require('./middlewares/i18n').bind(this));

  // 自动清理文件...日
  //this.use(multerAutoReap);

  // .扩展req和res
  this.use(require('./middlewares/extend').bind(this));

  // .form文件解析
  const fileParser = multer({
    storage: multer.diskStorage({
      destination: this.config.ROOT_PATH + '/.tmp'
      // filename
    }),
    // fieldNameSize/fieldSize/fields/fileSize/files/parts/headerPairs/
    limits: this.config.UPLOAD
    // fileFilter
  }).any();//.fields() 指定上传字段
  this.use(fileParser);

  // 插入点
  if (cb) {
    await cb.call(this);
  }

  this.schedule.create('test', '0 */1 * * * *', function () {
    app.logger('cron').info('excute', 'aaa');
  }, true);

  this.dispatch();

  // // .默认错误
  // this.use(function (err, req, res, next) {
  //   app.logger('project').error('error', `${req.method} ${req.originalUrl} ${err.stack} `);
  //   if (err) {
  //     res.header('status', 500);
  //     res.json({ [CFG.RES_STATUS]: CFG.RES_FAIL });
  //   }
  // });

  // // .404处理
  // this.use(function (req, res, next) {
  //   if (!res.headersSent) {
  //     res.header('status', 404);
  //     res.json({ [CFG.RES_STATUS]: CFG.RES_FAIL });
  //   } else {
  //     next();
  //   }
  // });

  if (process.env.NODE_ENV != 'test') {
    this.logger('project').info('start', `${process.env.NODE_ENV} ${process.env.PROJECT_NAME} ${process.env.PORT} `);
    this.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`项目 ${process.env.PROJECT_NAME} 已启动:端口(${process.env.PORT})`);
    });
  }

};

module.exports = app;