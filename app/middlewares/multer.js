const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/uploads');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, file.originalname + '-' + uniqueSuffix);
	}
});

const fileFilter = (req,file,cb) => {
	const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
	}
}

const uploadMiddleware = multer({
	storage: storage,
	limits:{
		fileSize: 3000000
	},
	fileFilter: fileFilter,
});

module.exports = uploadMiddleware;