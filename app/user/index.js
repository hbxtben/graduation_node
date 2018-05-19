var userModel = require("../../model/userModel");
var DAO = require("../../core/dao");

var userDAO = new DAO(userModel);

var user = {
    logout: function(req, res) {
        req.session.user = null;
        res.send({ret: true, errmsg: ""});
    },

    signin: function(req, res) {
        var data = req.query;

        if(data) {
            userDAO.find({username: data.username}, function(err, preData) {
                //之前没有注册过
                if(!err && preData.length === 0) {
                    userDAO.insert(data, function(err, doc) {
                        var ret = !err;
                        
                        if(ret) {
                            //添加到session
                            req.session.user = data;
                        }
                        res.send({
                            ret: ret, 
                            data: {
                                username: data.username,
                                nickname: data.nickname
                            },
                            errmsg: ""
                        });
                    });
                //之前注册过
                } else {
                    res.send({ret: false, errmsg: "user has been signed"});
                }
            });   
        } else {
            res.send({ret: false, errmsg: "no data"});
        }
    },

    doLogin: function(req, res) {
        var data = req.query;

        if(data) {
            userDAO.find({
                username: data.username, 
                password: data.password
            }, function(err, docs) {
                if(!err && docs.length != 0) {
                    //添加到session
                    req.session.user = data;

                    res.send({
                        ret: true, 
                        data: {
                            username: data.username,
                            nickname: data.nickname
                        },
                        errmsg: ""
                    });
                } else {
                    res.send({ret: false, errmsg: "username or password is wrong"});
                }
            })
        } else {
            res.send({ret: false, errmsg: "no data"});
        }
    },

    isLogin: function(req, res) {
        var data = req.session.user,
            result = {};
        if(data) {
            result = {
                ret: true,
                data: {
                    username: data.username,
                    nickname: data.nickname
                },
                errmsg: ""
            };
        } else {
            result = {ret: false, errmsg: ""}
        }

        res.send(result);
    }
}

module.exports = user;