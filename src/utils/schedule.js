const Job = require('cron').CronJob;

class Schedule {
  static load(schedules = {}, ctx) {
    // name time tick
    for (let name in schedules) {
      const schedule = schedules[name];
      Schedule.tasks[name] = {
        state: 0,
        job: new Job(schedule.time, function () {
          const task = Schedule.tasks[name];
          schedule.tick.call(ctx, Schedule.tasks[name]).then(function () {
            task.state = 0;
          }).catch(function () {
            task.state = 0;
            console.log(`schedule ${name} error`);
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
    if (Schedule.tasks[name] && Schedule.tasks[name].state === 0) {
      Schedule.tasks[name].job.fireOnTick();
      return true;
    }
    return false;
  }

  // 转为定时
  static start(name) {
    if (Schedule.tasks[name]) {
      Schedule.tasks[name].job.start();
      return true;
    }
    return false;
  }

  // 停止定时
  static stop(name) {
    Schedule.tasks[name] && Schedule.tasks[name].job.stop();
  }
}

Schedule.tasks = {};

module.exports = Schedule;
