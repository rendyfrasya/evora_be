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

userSchema.pre('save', async function (next) {
	const User = this;
	if (User.isModified('password')) {
		User.password = await bcrypt.hash(User.password, 12);
	}
	next();
})

userSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
}

module.export = model('Users', userSchema);