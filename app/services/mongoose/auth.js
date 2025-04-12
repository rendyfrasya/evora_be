const Users = require('../../api/v1/users/model');
const { createJWT, createUserToken } = require('../../utils/auth');
const {BadRequestError, NotFoundError,UnauthorizedError} = require('../../utils/response/errors');

const signin = async (req) => {
	const { email, password } = req.body;

	if(!email || !password) {
		throw new BadRequestError('Please provide email and password');
	}

	const userData = await Users.findOne({email});
	if(!userData) throw new NotFoundError('Email atau password salah');

	const isPasswordValid = await userData.comparePassword(password);
	if(!isPasswordValid) throw new UnauthorizedError('Email atau password salah');

	const token = createJWT({ payload: createUserToken(userData) });

	return token;
}

module.exports = {
	signin,
}