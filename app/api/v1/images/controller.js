const { createImages } = require("../../../services/mongoose/images");
const response = require('../../../utils/response');

const create = async (req, res, next) => {
	try {
		const result = await createImages(req);
		response.success(result, "Images Uploaded!", res)	
	} catch (error) {
		next(error);
	}
};

module.exports = {
	create
}