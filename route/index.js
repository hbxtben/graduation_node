var express = require('express');
var router = express.Router();

var userRouter = require("./user");
var graphsRouter = require("./graphs");

router.use("/user", userRouter);
router.use("/graphs", graphsRouter);

module.exports = router;