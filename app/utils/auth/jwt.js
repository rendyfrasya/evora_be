const jwt = require('jsonwebtoken');
const { JWT_EXPIRATION_TIME,JWT_SECRET_KEY } = require('../../../configs/config');

const createJWT = ({ payload }) => {
	const token = jwt.sign(payload, JWT_SECRET_KEY, {
		expiresIn: JWT_EXPIRATION_TIME,
	});
	return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, JWT_SECRET_KEY);

module.exports = {
	createJWT,
	isTokenValid,
};