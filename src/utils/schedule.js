const Job = require('cron').CronJob;

class Schedule {
  static load(schedules = {}, ctx) {
    // name time tick
    for (let name in schedules) {
      const schedule = schedules[name];
      Schedule.tasks[name] = {
        active: false,
        runing: false,
        name,
        job: new Job(schedule.time, function () {
          const task = Schedule.tasks[name];
          const task_name = task.name;
          task.runing = true
          console.log('run task:' + task_name, task.runing)
          schedule.tick.call(ctx, Schedule.tasks[task_name]).then(function () {
            task.runing = false;
          }).catch(function (e) {
            task.runing = false;
            console.log(`schedule ${task_name} error:${e.message}`);
          });
        }, null, false, 'Asia/Shanghai')
      };
    }
  }

  static getTask(name) {
    return Schedule.tasks[name];
  }

  static isActive(name) {
    return Schedule.tasks[name] && Schedule.tasks[name].active;
  }

  static isRuning(name) {
    return Schedule.tasks[name] && Schedule.tasks[name].runing
  }

  // 手动触发一次
  static tick(name) {
    if (!Schedule.isRuning(name)) {
      Schedule.tasks[name].job.fireOnTick();
      return true;
    }
    return false;
  }

  // 转为定时
  static start(name) {
    if (Schedule.tasks[name]) {
      Schedule.tasks[name].active = true
      Schedule.tasks[name].job.start();
      return true;
    }
    return false;
  }

  // 停止定时
  static stop(name) {
    if (Schedule.tasks[name]) {
      Schedule.tasks[name].active = false
      Schedule.tasks[name].job.stop();
    }
  }
}

Schedule.tasks = {};

module.exports = Schedule;
