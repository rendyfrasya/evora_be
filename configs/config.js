require('dotenv').config();

module.exports = {
	APP_PORT: process.env.PORT,
	URL_DB: process.env.URL_MONGODB_DEV,
	API_VERSION: process.env.API_VERSION,
	JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
}