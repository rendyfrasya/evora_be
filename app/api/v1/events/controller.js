const Events = require('./model');
const response = require('../../../utils/response');
const req = require('express/lib/request');
const { getAllEvents,
	createEvents,
	getOneEvents,
	updateEvents,
	deleteEvents} = require('../../../services/mongoose/events');

const create = async (req,res,next) => {
	try {
	  const result = await createEvents(req);
	  response.success(result, "Event created!", res)	
	} catch (error) {
		console.log(error);
		next(error);
	}
}

const index = async (req,res,next) =>{
	try {
		const result = await getAllEvents(req);
		response.success(result, "Events data get!", res)
	} catch (error) {
		next(error);
	}
}

const find = async (req,res,next) =>{
	try {
		const result = await getOneEvents(req);
		response.success(result, "Event data found!", res)
	} catch (error) {
		next(error);
	}
}
const update = async (req,res,next) =>{
	try {
		const result = await updateEvents(req);
		response.success(result, "Event data updated!", res);
	} catch (error) {
		next(error);
	}
}
const destroy = async (req,res,next) =>{
	try {
		const result = await deleteEvents(req);
		response.success(result, "Event data deleted!", res)
	} catch (error) {
		next(error);
	}
}
module.exports = {
	index,create,find,update,destroy
}