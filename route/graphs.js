var express = require('express');
var router = express.Router();
var graphs = require("../app/graphs/index");

router.get("/getGraphList", graphs.getGraphList);

router.get("/getGraphDetail", graphs.getGraphDetail);

router.get("/delGraphItem", graphs.delGraphItem);

router.get("/saveGraphData", graphs.saveGraphData);

module.exports = router;