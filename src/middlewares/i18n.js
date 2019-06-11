module.exports = function (req, res, next) {
  const config = req.app.config;
  let lang = req.cookies.lang;
  req.locale = config.i18n.langs.indexOf(lang) === -1 ? config.i18n.default : lang;
  res.locale = req.locale;
  next();
};