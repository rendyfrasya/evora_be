require('dotenv').config();

module.exports = {
	APP_PORT: process.env.PORT,
	URL_DB: process.env.URL_MONGODB_DEV,
	API_VERSION: process.env.API_VERSION
}