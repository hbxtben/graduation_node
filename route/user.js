var express = require('express');
var router = express.Router();
var user = require("../app/user/index");

//用户登出
router.get("/logout", user.logout);

//用户登录
// router.post("/doLogin", user.doLogin);

//用户注册
router.get("/signin", user.signin);

//用户登出
// router.get("/logout", user.logout);

module.exports = router;