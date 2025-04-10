const express = require("express");
const { createCMSOrganizers } = require("../app/api/v1/organizers/controller");
const organizers = express.Router();

organizers.post('/organizers/create',createCMSOrganizers);

module.exports = organizers;