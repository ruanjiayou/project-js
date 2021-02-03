const fs = require('fs');

class logger {
  constructor(name) {
    this.name = name;
  }
  log(level, type, message = '') {
    let date = new Date();
    let dir = `${CFG.LOG_PATH}/${date.getFullYear()}${date.getMonth() + 1}${date.getDate() + 1}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(
      `${dir}/${this.name}-${type}.log`,
      `${date.toLocaleString()}  ${level}  ${message}\n`,
      { encoding: 'utf-8', flag: 'a' }
    );
  }
  info(type, message) {
    this.log('info', type, message);
  }
  dev(type, message) {
    this.log('dev', type, message);
  }
  error(type, message) {
    this.log('error', type, message);
  }
};

module.exports = function (name) {
  return new logger(name);
};