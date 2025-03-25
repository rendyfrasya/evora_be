const express = require("express");
const { create, index, find, update, destroy } = require("../app/api/v1/events/controller");
const events = express.Router();

events.get('/events',index);
events.get('/events/:id',find);
events.post('/events/create',create);
events.put('/events/update/:id',update);
events.delete('/events/delete/:id',destroy);

module.exports = events;