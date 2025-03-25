const Categories = require('../../api/v1/categories/model');
const {BadRequestError, NotFoundError} = require('../../utils/response/errors')

const getAllCategories =  async () => {
	const result = await Categories.find().lean();
	return result;
};

const createCategories = async (req) => {
	const {name} = req.body;
	const check = await Categories.findOne({name}).lean();

	if(check) throw new BadRequestError('Kategori dengan nama ini sudah ada');

	const result = await Categories.create({name});
	return result;
};

const getOneCategories = async (req) => {
	const {id} = req.params
	const result = await Categories.findOne({_id : id}).lean();

	if(!result) throw new NotFoundError(`Tidak ada Kategori dengan id : ${id}`);

	return result;
}

const updateCategories = async (req) => {
	const { id } = req.params;
	const { name } = req.body;

	const check = await Categories.findOne({
		name,
		_id: {$ne: id},
	}).lean();
	
	if (check) throw new BadRequestError('Kategori dengan nama ini sudah ada');
	
	
	const result = await Categories.findByIdAndUpdate(
		id,
		{ name },
		{ new: true, runValidators: true }
	);

	if(!result) throw new NotFoundError(`Tidak ada Kategori dengan id : ${id}`);
	
	return result;
}

const deleteCategories = async (req) => {
	const { id } = req.params;
	const result = await Categories.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id : ${id}`);

	await result.deleteOne();

	return result;
};

const checkingCategories = async (id) => {
	const result = await Categories.findOne({_id: id}).lean();
	if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);
	return result;
}
module.exports = {
	getAllCategories,
	createCategories,
	getOneCategories,
	updateCategories,
	deleteCategories,
	checkingCategories,
};