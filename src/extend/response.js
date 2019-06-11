const _ = require('lodash');
const http = require('http');

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
      [CFG.RES_MESSAGE]: ''
    };
    if (!_.isEmpty(err)) {
      res[CFG.RES_CODE] = err.code;
      res[CFG.RES_MESSAGE] = err.message;
    }
    return res;
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