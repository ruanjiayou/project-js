const ioHelper = require('./utils');
const fs = require('fs');

module.exports = class localStorage {
  static _storeOne(file, format) {
    let filepath = '', relpath = '';
    let isExisted = true;
    while (isExisted) {
      relpath = `/${ioHelper.generatePath(format, file.originalname)}`;
      filepath = CFG.UPLOAD_PATH + relpath;
      if (!ioHelper.isFileExists(filepath)) {
        isExisted = false;
        ioHelper.moveFile(file.path, filepath);
      }
    }
    return relpath;
  }
  static async create(files, format) {
    const res = {};
    for (let i = 0; i < files.length; i++) {
      const field = files[i].fieldname;
      if (format[field] === undefined) {
        continue;
      }
      let relpath = localStorage._storeOne(files[i], format[field]);
      res[field] = relpath;
    }
    return res;
  }
  static async destroy(filepath) {
    fs.unlink(CFG.UPLOAD_PATH + filepath);
  }
};