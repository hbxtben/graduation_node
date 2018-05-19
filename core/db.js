var mongoose = require("mongoose");
var config = require("../config");
var dbconfig = config.dbConfig;
var url = ["mongodb://", dbconfig.user, ":",dbconfig.pwd, "@", dbconfig.domain, "/",dbconfig.db].join("");

var dbConnect = false

//数据库连接
mongoose.connect(url, function(err) {
    if(err){
        console.log('database connect fail !!!');
    }else{
        dbConnect = true;
        console.log('database connect success~');
    }
});

module.exports = function() {
    return dbConnect;
};