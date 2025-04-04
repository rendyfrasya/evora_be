const { StatusCodes } = require('http-status-codes');
const errorHandleMiddleware = (err,req,res,next) => {
	let customError = {
		success: false,
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong, try again later",
	};

	//Error validation dari DB(Monggodb)
	if(err.name === 'ValidationError'){
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(', ');
		customError.statusCode = 400;
	}

	if(err.code && err.code === 11000){
		customError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field, please recheck and choose another value`;
		customError.statusCode = 400;
	}

	if(err.name === 'CastError'){
		customError.msg = `No item found with id : ${err.value}`;
		customError.statusCode = 400;
	}
	return res.status(customError.statusCode).json(customError);
}

module.exports = errorHandleMiddleware;
