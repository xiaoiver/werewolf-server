var Routes = function () {};

Routes.prototype.applyTo = function (router) {
  require('./games')(router);
}

module.exports = new Routes();
