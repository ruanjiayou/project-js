module.exports = {
  test: {
    time: '*/5 * * * * *',
    tick: function () {
      console.log(this.config);
      console.log(new Date().toTimeString());
    }
  }
};