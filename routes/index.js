var express = require('express');
const categoriesRouter = require("./categories");
const imagesRouter = require("./images");
const talentsRouter = require("./talents");
const eventsRouter = require("./events");
const { API_VERSION } = require('../configs/config');
var router = express.Router();

router.use(API_VERSION, categoriesRouter);
router.use(API_VERSION, imagesRouter);
router.use(API_VERSION, talentsRouter);
router.use(API_VERSION, eventsRouter);

module.exports = router;
