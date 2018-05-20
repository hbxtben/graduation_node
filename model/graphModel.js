var mongoose = require('mongoose');

var graphSchema = new mongoose.Schema({
    data: {type: String, require: true},
    graphType: {type: String, require: true},
    options: {type: String, require: true},
    username: {type: String, require: true},
    img: {type: String, default: ""}
});

var graphModel = mongoose.model("graphModel", graphSchema);

module.exports = graphModel;