const gulp = require('gulp');
const apidoc = require('gulp-apidoc');
const _ = require('lodash');
const nodemon = require('gulp-nodemon');
require('dotenv').config();
require('./config/config.default');
require('./config/config.dev');

/**
 * 生成api文档
 */
gulp.task('doc', (done) => {
  apidoc({ src: 'src/routes', dest: 'static/doc', debug: false }, done);
});

function develop(port, project_name) {
  const stream = nodemon({
    script: 'run.js',
    watch: ['src', 'config', 'run.js', 'gulpfile.js'],
    ext: 'js json',
    delay: 3000,
    env: {
      NODE_ENV: 'dev',
      PORT: port,
    }
  });
  stream
    .on('restart', () => {
      console.log('重启中...');
    })
    .on('crash', (err) => {
      console.log(err);
      console.log('启动失败');
      stream.emit('restart', 10);
    })
    .on('exit', () => {
      //process.exit(0);
    });
}

/**
 * 启动项目
 */
gulp.task('dev', () => {
  develop(process.env.PORT, process.env.PROJECT_NAME);
});

gulp.task('default', ['dev']);