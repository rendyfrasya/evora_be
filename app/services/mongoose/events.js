const Events = require('../../api/v1/events/model');
const { BadRequestError,NotFoundError } = require('../../utils/response/errors');
const { checkingCategories } = require('./categories');
const { checkingImages } = require('./images');
const { checkingTalents } = require('./talents');

const getAllEvents = async (req) => {
	const { keyword,category,talent } = req.query;

	const condition = Object.assign(
        keyword ? { name: { $regex: keyword, $options: 'i' } } : {},
        category ? { category } : {},
        talent ? { talent } : {}
    );

	const result = await Events.find(condition)
		.populate({
			path: 'image',
			select: '_id name url_image',
		})
		.populate({
			path: 'category',
			select: '_id name',
		})
		.populate({
			path: 'talent',
			select: '_id name role image',
			populate: {
				path: 'image',
				select: '_id name url_image',
			}
		}).lean();
	return result;
};

const createEvents = async (req) => {
	const { name, date, about, tagline, keypoint, status_event, venue_name, category, talent, tickets, image } = req.body;
	await Promise.all([
		checkingImages(image),
		checkingCategories(category),
		checkingTalents(talent),
	]);

	const check = await Events.findOne({ name }).lean();
	if(check) throw new BadRequestError('Nama Event sudah terdaftar');

	const result = await Events.create({
		name,
		date,
		about,
		tagline,
		keypoint,
		status_event,
		venue_name,
		category,
		talent,
		tickets,
		image,
	});

	return result;
}

const getOneEvents = async (req) => {
	const { id } = req.params;
	const result = await Events.findOne({ _id: id })
		.populate({
			path: 'image',
			select: '_id name url_image',
		})
		.populate({
			path: 'category',
			select: '_id name',
		})
		.populate({
			path: 'talent',
			select: '_id name role image',
			populate: {
				path: 'image',
				select: '_id name url_image',
			}
		}).lean();
	
	if(!result) throw new NotFoundError(`Tidak ada Event dengan id : ${id}`);

	return result;
}

const updateEvents = async (req) => {
	const { id } = req.params;
	const { name, date, about, tagline, keypoint, status_event, venue_name, category, talent, tickets, image } = req.body;

	await Promise.all([
		checkingImages(image),
		checkingCategories(category),
		checkingTalents(talent),
	]);

	const check = await Events.findOne({
		name,
		_id: { $ne: id },
	}).lean();

	if(check) throw new BadRequestError('Nama Event sudah terdaftar');

	const result = await Events.findByIdAndUpdate(
		id,
		{
			name,
			date,
			about,
			tagline,
			keypoint,
			status_event,
			venue_name,
			category,
			talent,
			tickets,
			image,
		},
		{ new: true, runValidators: true }
	);

	if (!result) throw new NotFoundError(`Tidak ada Event dengan id : ${id}`);

	return result;
}

const deleteEvents = async (req) => {
	const { id } = req.params;
	const result = await Events.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada Event dengan id : ${id}`);

	await result.deleteOne();

	return result;
}

const checkingEvents = async (id) => {
	const result = await Events.findOne({_id: id});
	if (!result) throw new NotFoundError(`Tidak ada event dengan id : ${id}`);
	return result;
}

module.exports = {
	getAllEvents,
	createEvents,
	getOneEvents,
	updateEvents,
	deleteEvents,
	checkingEvents,
};

