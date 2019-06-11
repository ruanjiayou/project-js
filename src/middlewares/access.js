module.exports = async function (req, res, next) {
  const requestID = this.utils.random(64, 'imix');
  req.header('X-Request-ID', requestID);
  this.logger(process.env.PROJECT_NAME || 'project').info('access', `${req.ip} ${requestID}`);
  next();
};