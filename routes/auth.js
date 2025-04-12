const express = require("express");
const { signinCms } = require("../app/api/v1/auth/controller");
const auth = express.Router();

auth.post('/auth/signin', signinCms);

module.exports = auth;