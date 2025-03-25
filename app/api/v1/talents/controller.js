const { createTalents,getAllTalents,getOneTalents,updateTalents,deleteTalents } = require("../../../services/mongoose/talents");
const response = require('../../../utils/response');

const create = async (req, res, next) => {
	try {
		const result = await createTalents(req);
		response.success(result, "Talents Created!", res)	
	} catch (error) {
		next(error);
	}
};

const index = async (req, res, next) => {
	try {
		const result = await getAllTalents(req);
		response.success(result, "Talents data get!", res)	
	} catch (error) {
		next(error);
	}
};

const find = async (req, res, next) => {
	try {
		const result = await getOneTalents(req);
		response.success(result, "Talents data found!", res)	
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const result = await updateTalents(req);
		response.success(result, "Talents data updated!", res)	
	} catch (error) {
		next(error);
	}
};

const destroy = async (req, res, next) => {
	try {
		const result = await deleteTalents(req);
		response.success(result, "Talents data deleted!", res)	
	} catch (error) {
		next(error);
	}
};

module.exports = {
	create,
	index,
	find,
	update,
	destroy,
}