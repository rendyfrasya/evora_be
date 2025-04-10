const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const {BadRequestError, NotFoundError} = require('../../utils/response/errors')

const createOrganizers = async (req) => {
	const {organizer, name, email, password, confirmPassword,role} = req.body;

	if(password !== confirmPassword) throw new BadRequestError('Password dan Confirm Password harus sama');

	let organizerData = await Organizers.findOne({organizer});

	if(!organizerData){
		organizerData = await Organizers.create({organizer});	
	}

	const newUsers = await Users.create({
		name,
		email,
		password,
		organizer : organizerData._id,
		role
	});

	delete newUsers._doc.password;

	return newUsers
}

module.exports = {createOrganizers};