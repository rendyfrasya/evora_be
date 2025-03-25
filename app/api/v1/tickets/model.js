const req = require('express/lib/request');
const mongoose = require('mongoose');

const {model,Schema} = mongoose;
const TicketSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Nama tiket harus diisi.'],
	},
	price: {
		type: Double,
		default: 0,
	},
	stock:{
		type: Number,
		default: 0,
	},
	is_available:{
		type: Boolean,
		enum: ['true', 'false'],
		default: true,
	}
});


module.exports = model('Tickets', TicketSchema);