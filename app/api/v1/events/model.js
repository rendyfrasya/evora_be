const req = require('express/lib/request');
const mongoose = require('mongoose');
const {model,Schema} = mongoose;

let TicketsEventSchema = Schema(
	{
		name:{
			type: String,
			required: [true, 'Nama harus diisi'],
		},
		price: {
			type: Number,
			default: 0,
		},
		stock:{
			type: Number,
			default: 0,
		},
		is_available:{
			type: Boolean,
			default: true,
		}
	}
)

let EventSchema = Schema(
	{
		name:{
			type: String,
			required: [true, 'Nama harus diisi'],
		},
		date:{
			type: Date,
			required: [true, 'Tanggal dan waktu harus diisi'],
		},
		about:{
			type: String,
		},
		tagline:{
			type: String,
			required: [true, 'Tagline harus diisi'],
		},
		keypoint:{
			type: [String],
		},
		venue_name:{
			type: String,
			required: [true, 'Tempat acara harus diisi'],
		},
		status_event:{
			type: String,
			enum: ['Draft', 'Published'],
			default: 'Draft',
		},
		tickets: {
			type: [TicketsEventSchema],
			validate: {
				validator: function (v) {
					return v.length > 0;
				},
				message: "Minimal harus ada 1 tiket."
			},
			required: true,
		},		
		image:{
			type: mongoose.Types.ObjectId,
			ref:"Images",
			required: true,
		},
		category:{
			type: mongoose.Types.ObjectId,
			ref:"Categories",
			required: true,
		},
		talent:{
			type: mongoose.Types.ObjectId,
			ref:"Talents",
			required: true,
		},
	},

	{ timestamps: true }
);

module.exports = model('Events', EventSchema);