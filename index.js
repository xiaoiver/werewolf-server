if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

var
  fs = require('fs'),
  path = require('path'),
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config'),
  mongoConfig = process.env.NODE_ENV === 'development'
    ? config.dev.mongo : config.prod.mongo,
  port = process.env.PORT || (process.env.NODE_ENV === 'development'
    ? config.dev.port : config.prod.port),
  routes = require('./routes');

// mongodb
mongoose.connect('mongodb://'
  + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.dbName);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api路由
var router = express.Router();
routes.applyTo(router);
app.use('/api', router);

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
});
