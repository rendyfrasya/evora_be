const express = require("express");
const { create, index, find, update, destroy } = require("../app/api/v1/talents/controller");
const talents = express.Router();

talents.get('/talents',index);
talents.get('/talents/:id',find);
talents.post('/talents/create',create);
talents.put('/talents/update/:id',update);
talents.delete('/talents/delete/:id',destroy);

module.exports = talents;