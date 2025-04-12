const mongoose = require('mongoose');
const {model,Schema} = mongoose;

let categorySchema = Schema(
	{
		name:{
			type: String,
			required: [true, 'Nama kategori harus diisi'],
			minlength: [3, 'Panjang nama kategori minimal 3 karakter'],
			maxlength: [20, 'Panjang nama kategori maksimal 20 karakter']
		},
		organizer:{
			type: mongoose.Types.ObjectId,
			ref:"Organizers",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model('Categories', categorySchema);