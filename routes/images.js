const express = require("express");
const multer = require("multer");
const {create} = require("../app/api/v1/images/controller");
const upload = require("../app/middlewares/multer");
const images = express.Router();

images.post('/images/upload',upload.single('avatar'),create);

module.exports = images;