var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var allRouter = require("./route");

//数据库连接
var connect = require("./core/db"); 

//添加cookie和session
app.use(cookieParser('userinfo'));
app.use(session({
    secret: 'userinfo',
    resave: true,
    saveUninitialized: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//解决跨域
app.all('*', function(req, res, next) {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,access_token,user_id",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
    });
    if(req.method=="OPTIONS") {
        res.send(204);
    }else {
        console.log("\n", new Date());
        console.log(req.path);
        next();
    }
});

app.use("/", allRouter);

var server = app.listen(10010, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('homework server listening at http://%s:%s', host, port);
});