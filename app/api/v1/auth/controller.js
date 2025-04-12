const response = require('../../../utils/response');
const { signin } = require("../../../services/mongoose/auth");

const signinCms = async (req,res,next) => {
	try {
		const result = await signin(req);
		response.success(result, "Signin success!", res);
	}catch (error){
		next(error);
	}
}

module.exports = {
	signinCms
}