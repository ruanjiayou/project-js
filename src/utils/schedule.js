const Job = require('cron').CronJob;

class Schedule {
  static create(name, params, cb, start) {
    let job = new Job(params, function () {
      cb.call(Schedule, name);
    }, null, !!start, 'Asia/Shanghai');
    console.log(`${name} 任务已添加.`);
    this.prototype.tasks.push({ name, job, cb });
    if (!!start) {
      Schedule.start(name);
    }
    return job;
  }
  static cancel(name) {
    let task = this.prototype.tasks.find(j => j.name == name);
    if (task) {
      console.log(`${name} 任务已取消.`);
      task.job.stop();
    } else {
      console.log(`${name} 任务不存在.`);
    }
  }
  static start(name) {
    let task = this.prototype.tasks.find(j => j.name == name);
    if (task) {
      task.job.start();
      task.cb();
      console.log('cron start:' + name + new Date().toLocaleString());
    }
  }
}

Schedule.prototype.tasks = [];

module.exports = Schedule;