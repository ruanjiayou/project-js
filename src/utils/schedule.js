const Job = require('cron').CronJob;

class Schedule {
  static load(schedules = {}, ctx) {
    // name time tick
    for (let name in schedules) {
      const schedule = schedules[name];
      Schedule.tasks[name] = {
        state: 0,
        job: new Job(schedule.time, function () {
          this.state = 1;
          schedule.tick.call(ctx, function () {
            this.state = 0;
          });
        }, null, false, 'Asia/Shanghai')
      };
    }
  }

  static getTask(name) {
    return Schedule.tasks[name];
  }

  static isActive(name) {
    return Schedule.tasks[name] && Schedule.tasks[name].state === 0;
  }

  // 手动触发一次
  static tick(name) {
    Schedule.tasks[name] && Schedule.tasks[name].job.fireOnTick();
  }

  // 转为定时
  static start(name) {
    Schedule.tasks[name] && Schedule.tasks[name].job.start();
  }

  // 停止定时
  static stop(name) {
    Schedule.tasks[name] && Schedule.tasks[name].job.stop();
  }
}

Schedule.tasks = {};

module.exports = Schedule;
