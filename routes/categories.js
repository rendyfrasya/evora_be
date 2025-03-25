const express = require("express");
const { create, index, find, update, destroy } = require("../app/api/v1/categories/controller");
const categories = express.Router();

categories.get('/categories',index);
categories.get('/categories/:id',find);
categories.post('/categories/create',create);
categories.put('/categories/update/:id',update);
categories.delete('/categories/delete/:id',destroy);

module.exports = categories;