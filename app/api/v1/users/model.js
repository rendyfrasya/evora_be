const e = require('express');
const mongoose = require('mongoose');
const {model,Schema} = mongoose;

let userSchema = Schema(
	{
		name:{
			type: String,
			maxLength: 50,
			required: [true, 'Nama harus diisi'],
		},
		email:{
			type: String,
			required: [true, 'Email harus diisi'],
		},
		password:{
			type: String,
			required: [true, 'Password harus diisi'],
			minLength: 6,
		},
		role:{
			type: String,
			enum: ['admin', 'organizer', 'owner'],
			default: 'admin',
		},
		organizer:{
			type: mongoose.Types.ObjectId,
			ref:"Organizers",
			required: true,
		},
	},
	{ timestamps: true }
);