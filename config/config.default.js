if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'dev';
}

// 全局开始
Object.defineProperty(global, 'CFG', {
  value: {},
  writable: false,
  enumerable: true,
  configurable: false
});
Object.defineProperty(global, 'define', {
  value: function (key, value) {
    global.CFG[key] = value;
  },
  writable: false,
  enumerable: true,
  configurable: false
});

// 项目路径
define('ROOT_PATH', process.cwd());

// 约定目录
// 应用程序路径,固定写src,想根据NODE_ENV改也可以
define('APP_PATH', `${CFG.ROOT_PATH}/src`);
// 配置文件路径
define('CONFIG_PATH', `${CFG.ROOT_PATH}/config`);
// 静态文件路径
define('STATIC_PATH', `${CFG.ROOT_PATH}/static`);
// 上传文件夹路径
define('UPLOAD_PATH', `${CFG.ROOT_PATH}/upload`);
// 日志文件路径
define('LOG_PATH', `${CFG.ROOT_PATH}/log`);

// 约定名称
// 请求约定字段
define('REQ_PAGE', 'page');
define('REQ_LIMIT', 'limit');
define('REQ_SEARCH', 'search');
define('REQ_ORDER', 'order');
// 约定返回字段
define('RES_SUCCESS', 'success');
define('RES_FAIL', 'fail');
define('RES_STATUS', 'state');
define('RES_DATA', 'rdata');
define('RES_CODE', 'ecode');
define('RES_MESSAGE', 'message');
// 约定分页字段
define('RES_PAGER', 'pager');
define('RES_PAGER_PAGE', 'page');
define('RES_PAGER_PAGES', 'pages');
define('RES_PAGER_LIMIT', 'limit');
define('RES_PAGER_COUNT', 'count');
define('RES_PAGER_TOTAL', 'total');

// 跨域
define('CORS', {
  origin: '*',
  headers: ['X-Token']
});

// 多语言
define('i18n', {
  'langs': ['en-us', 'zh-cn'],
  'default': 'zh-cn'
});

// 上传
define('UPLOAD', {
  'fileSize': '10mb',
  'fields': 100,
  'fieldNameSize': 255
});

// 系统基本信息
define('SYSTEM', {
  language: 'nodejs',
  title: '项目'
});