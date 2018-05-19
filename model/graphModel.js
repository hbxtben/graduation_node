var mongoose = require('mongoose');

var graphSchema = new mongoose.Schema({
    title: {type: String, default: "普通图标"},
    introduce: {type: String, default: "简单滴介绍"},
    data: {type: String, require: true},
    type: {type: String, require: true},
    options: {type: String, require: true},
    imgUrl: {type: String, default: ""}
  });

var graphModel = mongoose.model("graphModel", graphSchema);

module.exports = graphModel;