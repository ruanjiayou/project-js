module.exports = {
  missJSON: {
    status: 400,
    code: 110010,
    message: (params) => {
      return `${params.lang ? '[' + params.lang + ']' : ''}${params.unit}.${params.type} 错误码不存在!`;
    }
  },
  internelUnknown: {
    status: 500,
    code: 110020,
    message: '服务器内部错误! message: {{message}}'
  },
  apiNotFound: {
    status: 404,
    code: 110030,
    message: 'API不存在!'
  }
};