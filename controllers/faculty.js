const Faculty = require('../models/Faculty');
const { sendWelcomeMail } = require('../utils/sendMail');

exports.getAllFaculty = async (req, res) => {
	const faculty = await Faculty.find(req.query);
	res.status(200).send({
		success: true,
		data: faculty
	});
};

exports.getSingleFaculty = async (req, res) => {
	const { id } = req.params;
	try {
		const faculty = await Faculty.findById(id);
		res.send({
			success: true,
			message: '',
			data: faculty
		});
	} catch (err) {
		res.send({
			success: false,
			message: err.message
		});
	}
};

exports.createFaculty = async (req, res) => {
	const faculty = new Faculty(req.body);
	sendWelcomeMail(faculty.email, faculty.name);
	try {
		await faculty.save();
		res.status(200).send({
			success: true,
			message: '',
			data: faculty
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
};

exports.deleteFaculty = async (req, res) => {
	const { id } = req.params;
	const faculty = await Faculty.deleteOne({ _id: id });
	try {
		res.status(200).send({
			success: true,
			message: '',
			data: faculty
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
};

exports.loginFaculty = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res.status(400).send({
			success: false,
			message: 'Please provide email and password'
		});

	const faculty = await Faculty.findOne({ email });
	if (!faculty)
		return res.status(401).send({
			success: false,
			message: 'Invalid Credentials'
		});

	const isPasswordValid = await faculty.matchPassword(password);
	if (!isPasswordValid)
		return res.status(401).send({
			success: false,
			message: 'Invalid Credentials'
		});

	const token = await faculty.getSignedJwt();

	res.status(200).send({
		success: true,
		data: token
	});
};
