const _ = require('lodash');
const http = require('http');
const { hinter, tpl } = require('errors-code');

module.exports = {
  /**
   * 返回成功
   * @param {object} [data] 数据 
   */
  success(data, params) {
    let res = {
      [CFG.RES_STATUS]: CFG.RES_SUCCESS,
      [CFG.RES_CODE]: 0,
      [CFG.RES_MESSAGE]: ''
    };
    if (!_.isEmpty(data) || data instanceof Array) {
      res[CFG.RES_DATA] = data;
    }
    if (params) {
      _.assign(res, params);
    }
    return res;
  },
  /**
   * 返回失败
   * @param {object} err 错误
   */
  fail(err) {
    let res = {
      [CFG.RES_STATUS]: CFG.RES_FAIL,
      [CFG.RES_CODE]: -1,
      [CFG.RES_MESSAGE]: '',
      [CFG.RES_STACK]: null,
    };
    if (err instanceof String) {
      res[CFG.RES_MESSAGE] = err
    } else if (!_.isEmpty(err)) {
      res[CFG.RES_CODE] = err.code || -1;
      res[CFG.RES_MESSAGE] = err.message;
      res[CFG.RES_STACK] = err.stack;
    }
    return res;
  },
  // 处理错误业务码和内部错误
  error(err) {
    let lang = this.locale || 'zh-cn', unit = '', type = '', params = {};
    const errorsJson = this.app.errorsCode;
    if (err instanceof hinter || (err.unit && err.type)) {
      unit = err.unit;
      type = err.type;
      params = err.params;
    } else if (err.message === '404') {
      unit = 'common';
      type = 'apiNotFound';
    } else {
      unit = 'common';
      type = 'internelUnknown';
      params = err;
    }
    const errorJson = errorsJson[lang][unit][type];
    this.status(errorJson.status);
    this.json(this.fail({
      code: errorJson.code,
      message: typeof errorJson.message === 'funciton' ? errorJson.message(params) : tpl(errorJson.message, params),
      stack: errorJson.stack,
    }));
  },
  paginator(data) {
    return this.success(data || []);
  },
  format(result) {
    if (typeof result === 'string' || result instanceof Buffer) {
      this.write(result);
      this.end();
    } else if (typeof result === 'object' && !(result instanceof http.ServerResponse)) {
      this.json(result);
    }
    // stream
  }
};
