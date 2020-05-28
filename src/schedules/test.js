module.exports = {
  test: {
    time: '*/5 * * * * *',
    tick: async function (task) {
      if (task.state === 0) {
        task.state = 1;
        console.log(this.config.APP_PATH);
        console.log(new Date().toTimeString());
      } else {
        console.log(`task:${task.name} is running`);
      }
    }
  }
};