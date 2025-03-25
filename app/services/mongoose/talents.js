const Talents = require('../../api/v1/talents/model');
const { checkingImages } = require('./images');
const {BadRequestError, NotFoundError} = require('../../utils/response/errors');

const getAllTalents = async (req) => {
	const { keyword } = req.query;

	const condition = Object.assign(
        keyword ? { name: { $regex: keyword, $options: 'i' } } : {}
    );

	const result = await Talents.find(condition)
		.populate({
			path: 'image',
			select: '_id name url_image',
		})
		.select('_id name role image').lean();
	
	return result;
}

const createTalents = async (req) => {
	const { name, role, image } = req.body;
	await checkingImages(image);
	const check = await Talents.findOne({ name }).lean();
	if(check) throw new BadRequestError('Nama Talent sudah terdaftar');
	const result = await Talents.create({ name, role, image });
	return result;
}

const getOneTalents = async (req) =>{
	const { id } = req.params;
	const result = await Talents.findOne({ _id: id })
	.populate({
			path: 'image',
			select: '_id name',
		})
	.select('_id name role image').lean();

	if(!result) throw new NotFoundError(`Tidak ada Talent dengan id : ${id}`);

	return result;
}

const updateTalents = async (req) => {
	const { id } = req.params;
	const { name, role, image } = req.body;
	await checkingImages(image);

	const check = await Talents.findOne({
		name,
		_id: {$ne: id},
	}).lean();

	if (check) throw new BadRequestError('Nama Talent sudah terdaftar');

	const result = await Talents.findByIdAndUpdate(
		id,
		{ name, role, image },
		{ new: true, runValidators: true }
	);

	if(!result) throw new NotFoundError(`Tidak ada Talents dengan id : ${id}`);

	return result;
}

const deleteTalents = async (req) => {
	const { id } = req.params;
	const result = await Talents.findOne({ _id: id });

	if(!result) throw new NotFoundError(`Tidak ada Talent dengan id : ${id}`);

	await result.deleteOne();

	return result;
}

const checkingTalents = async (id) => {
	const result = await Talents.findOne({ _id: id}).lean();
	if (!result) throw new NotFoundError(`Tidak ada talents dengan id : ${id}`);
	return result;
}

module.exports = {
	getAllTalents,
	createTalents,
	getOneTalents,
	updateTalents,
	deleteTalents,
	checkingTalents,
};