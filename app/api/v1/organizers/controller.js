const Categories = require('./model');
const response = require('../../../utils/response');
const { createOrganizers } = require('../../../services/mongoose/users');


const createCMSOrganizers = async (req,res,next) => {
	try {
	  const result = await createOrganizers(req);
	  response.success(result, "Organizers created!", res)	
	} catch (error) {
		next(error);
	}
}

module.exports = {
	createCMSOrganizers
}