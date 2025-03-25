const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../utils/response/errors');

const generateUrlImages = async (req) => {
	const result = `uploads/${req.file.filename}`;
	return result;
};

const createImages = async (req) => {
	const result = await Images.create({
		name: req.file.filename,
		url_image: req.file
		? `uploads/${req.file.filename}`
		: 'uploads/avatar/default.jpeg',
        mime: req.file.mimetype,  // Simpan MIME type
        size: req.file.size
	});
	return result;
};

const checkingImages = async (id) => {
	const result = await Images.findOne({ _id: id}).lean();
	if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id : ${id}`);
	return result;
}
module.exports = {
	createImages,
	checkingImages
};