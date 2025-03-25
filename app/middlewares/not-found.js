const notFound = (req,res) => {
	res.status(404).send({
		success: false,
		statusCode: 404,
		msg: 'Route does not exist'
	});
};

module.exports = notFound;