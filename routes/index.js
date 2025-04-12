var express = require('express');
const categoriesRouter = require("./categories");
const imagesRouter = require("./images");
const talentsRouter = require("./talents");
const eventsRouter = require("./events");
const organizersRouter = require("./organizers");
const authRouter = require("./auth");
const { API_VERSION } = require('../configs/config');
var router = express.Router();

router.use(API_VERSION, categoriesRouter);
router.use(API_VERSION, imagesRouter);
router.use(API_VERSION, talentsRouter);
router.use(API_VERSION, eventsRouter);
router.use(API_VERSION, organizersRouter);
router.use(API_VERSION, authRouter);

module.exports = router;
