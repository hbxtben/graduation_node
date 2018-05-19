var graphModel = require("../../model/graphModel");
var DAO = require("../../core/dao");

var graphDAO = new DAO(graphModel);

var graphs = {
    getGraphList: function(req, res) {
        graphDAO.find(function(err, doc) {
            if(!err) {
                res.send({ret: true, data: doc, errmsg: ""});
            } else {
                res.send({ret: false, errmsg: err});
            }
        })
    },

    saveGraphData: function(req, res) {
        var data = req.query;
        //编辑并保存以前的数据
        if(data.id) {
            console.log("update", data);
            graphDAO.update({
                _id: data.id
            }, data, function(err) {
                var ret = !err;

                res.send({ret: ret, errmsg: err});
            })
        } else {
        //添加新的图表数据
            delete data.id;
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

        if(data.id) {
            graphDAO.delete(data.id, function(err) {
                var ret = !err;

                res.send({ret: ret, errmsg: err}); 
            }); 
        } else {
            res.send({ret: false, errmsg: "there is not id to find graph"});
        }
    },

    getGraphDetail: function(req, res) {
        var data = req.query;

        if(data.id) {
            graphDAO.find({ _id: data.id }, function(err, doc) {
                var ret = !err;

                res.send({ret: ret, data: doc, errmsg: err}); 
            }); 
        } else {
            res.send({ret: false, errmsg: "there is not id to find graph"});
        }
    }
}

module.exports = graphs;