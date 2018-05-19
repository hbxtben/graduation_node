var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    nickname: {type: String, default: "无名氏"},
    username: {type: String, require: true},
    password: {type: String, require: true},
    sex: {type: Number, default: 0}
  });

var userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;