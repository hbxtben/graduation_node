var express = require('express');
var router = express.Router();
var user = require("../app/user/index");

//用户登出
// router.get("/logout", user.logout);

//用户登录
router.post("/doLogin", user.doLogin);

//用户注册
router.post("/signin", user.signin);

//判断用户是否登录
// router.get("/isLogin", user.isLogin);

module.exports = router;