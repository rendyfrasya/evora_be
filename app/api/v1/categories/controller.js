const Categories = require('./model');
const response = require('../../../utils/response');
const { getAllCategories,createCategories,getOneCategories, updateCategories, deleteCategories } = require('../../../services/mongoose/categories');

const create = async (req,res,next) => {
	try {
	  const result = await createCategories(req);
	  response.success(result, "Categories created!", res)	
	} catch (error) {
		next(error);
	}
}

const index = async (req,res,next) =>{
	try {
		const result = await getAllCategories();
		response.success(result, "Categories data get!", res)
	} catch (error) {
		next(error);
	}
}

const find = async (req,res,next) =>{
	try {
		const result = await getOneCategories(req);
		response.success(result, "Categories data found!", res)
	} catch (error) {
		next(error);
	}
}
const update = async (req,res,next) =>{
	try {
		const result = await updateCategories(req);
		response.success(result, "Categories data updated!", res);
	} catch (error) {
		next(error);
	}
}
const destroy = async (req,res,next) =>{
	try {
		const result = await deleteCategories(req);
		response.success(result, "Categories data deleted!", res)
	} catch (error) {
		next(error);
	}
}
module.exports = {
	index,create,find,update,destroy
}