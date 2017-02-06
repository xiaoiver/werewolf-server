var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  baseInfo: {
    name: String,
    datetime: String,
    location: String,
    isGodView: Boolean
  },
  cast: [],
  roleList: [],
  gallery: [],
  createTime: {
    'type': Number,
    'default': Date.now() // 创建时间
  }
});

module.exports = mongoose.model('Game', GameSchema);
