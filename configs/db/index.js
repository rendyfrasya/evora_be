const mongoose = require('mongoose');
const { URL_DB } = require('../config');

mongoose.connect(URL_DB);
const db = mongoose.connection;

module.exports = db;