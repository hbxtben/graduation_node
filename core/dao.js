function DAO(model) {
    this.model = model;
    return this;
}

DAO.prototype = {
    //操作结果的打印
    retStr: function(err, success, error) {
        if(!err) {
            console.log(success || "db job success. \n");
        } else {
            console.log(error || "db job error !!! \n")
        }
    },

    insert: function(data, cb) {
        var self = this;
        if(!data) {
            return false;
        }

        this.model(data).save(function(err, doc) {
            self.retStr(err, "insert success\n",  "insert error! \n" + JSON.stringify(err));
            
            cb && cb(err, doc);
        })
    },

    delete: function(id, cb) {
        var self = this;
        if(!id) {
            return null;
        }

        this.model.findByIdAndRemove(id, function(err,doc){
            self.retStr(err, "delete success:\n",  "delete error! \n" + JSON.stringify(err));

            cb && cb(err);            
        })
    },

    update: function(conditions, data, cb) {
        var self = this;

        this.model.update(conditions, data, function(err, doc) {
            self.retStr(err, "update success:\n",  "update error! \n" + JSON.stringify(err));   

            cb && cb(err);
        });
    },

    find: function(data, cb) {
        if(!cb) {
            cb = data;
            data = {};
        }

        this.model.find(data, function(err, docs) {
            cb && cb(err, docs);
        })
    },

    getCount: function(opt, cb) {
        if(!cb) {
            cb = opt;
            opt = {};
        }

        this.model
        .find(opt)
        .count(function(err, num) {
            cb && cb(err, num);
        })
    },

    devideFind: function(opt, cb) {
        var limitNum = opt && Number(opt.limit),
            curPage = opt && Number(opt.curPage);

        if(limitNum && curPage) {
            this.model
            .find(opt.condition || {})
            .skip((curPage-1) * limitNum)
            .limit(limitNum)
            .exec(function(err, docs) {
                cb && cb(err, docs)
            })   
        }
    }
}

module.exports = DAO;