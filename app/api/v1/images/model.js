const mongoose = require('mongoose');
const {model,Schema} = mongoose;

let ImageSchema = Schema(
	{
		name:{type: String},
		url_image:{type: String},
		mime:{type: String},
		size:{type: Number},
	},
	{ timestamps: true }
);

module.exports = model('Images', ImageSchema);