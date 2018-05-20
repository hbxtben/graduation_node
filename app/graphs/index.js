var graphModel = require("../../model/graphModel");
var DAO = require("../../core/dao");

var graphDAO = new DAO(graphModel);

var graphs = {
    getGraphList: function(req, res) {
        var data = req.query,
            pageNum = data.pageNum,
            pageSize = data.pageSize,
            username = data.username;

        graphDAO.devideFind({
            limit: pageSize,
            curPage: pageNum,
            condition: {
                username: username
            }
        }, function(err, docs) {
            if(!err) {
                graphDAO.getCount(function(err, num) {
                    if(!err) {
                        res.send({
                            ret: true, 
                            data: {
                                list: docs,
                                dataSize: num
                            },
                            errmsg: ""
                        })
                    } else {
                        res.send({ret: false, errmsg: err});                
                    }
                })
            } else {
                res.send({ret: false, errmsg: err});
            }
        })
    },

    saveGraphData: function(req, res) {
        var data = req.body.params;

        data.options = JSON.stringify(data.options);
        data.data = JSON.stringify(data.data);

        //编辑并保存以前的数据
        if(data._id) {
            console.log("update", data);

            graphDAO.update({
                _id: data._id
            }, data, function(err) {
                var ret = !err;

                res.send({ret: ret, errmsg: err});
            })
        } else {
        //添加新的图表数据
            delete data._id;

            console.log("insert", data);
            graphDAO.insert(data, function(err) {
                var ret = !err;

                res.send({ret: ret, errmsg: err});
            });
        }
    },

    //删除图表单项
    delGraphItem: function(req, res) {
        var data = req.query;

        if(data._id) {
            graphDAO.delete(data._id, function(err) {
                var ret = !err;

                res.send({ret: ret, errmsg: err}); 
            }); 
        } else {
            res.send({ret: false, errmsg: "there is not id to find graph and delete"});
        }
    },

    getGraphDetail: function(req, res) {
        var data = req.query;

        if(data._id) {
            graphDAO.find({ _id: data._id }, function(err, doc) {
                var ret = !err;

                res.send({ret: ret, data: doc, errmsg: err}); 
            }); 
        } else {
            res.send({ret: false, errmsg: "there is not id to find graph"});
        }
    }
}

module.exports = graphs;