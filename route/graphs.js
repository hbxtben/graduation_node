var express = require('express');
var router = express.Router();
var graphs = require("../app/graphs/index");

router.get("/getGraphList", graphs.getGraphList);

router.get("/getGraphDetail", graphs.getGraphDetail);

router.get("/delGraphItem", graphs.delGraphItem);

router.post("/saveGraphData", graphs.saveGraphData);

module.exports = router;