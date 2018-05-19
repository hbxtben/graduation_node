var userModel = require("../../model/userModel");
var DAO = require("../../core/dao");

var userDAO = new DAO(userModel);

var user = {
    logout: function(req, res) {
        res.send("hello logout");
    },

    signin: function(req, res) {
        var data = {
            nickname: "zzpstc",
            username: "zhangzipeng",
            password: "123456",
            sex: 1
        };
        console.log(req.query);
        if(data) {
            userDAO.insert(data, function(err, doc) {
                var ret = !err;
                res.send({ret: ret, errmsg: err});
            })
        }
    }
}

module.exports = user;