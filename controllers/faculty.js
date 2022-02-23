const Faculty = require('../models/Faculty');

exports.getAllFaculty = async (req, res) => {
	const faculty = await Faculty.find(req.query);
	res.send(faculty);
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

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	const faculty = await Faculty.findOne({ email });
	if (!faculty)
		return res.status(404).send({
			success: false,
			message: 'Invalid Email'
		});

	const isPasswordValid = await faculty.matchPassword(password);
	if (!isPasswordValid)
		return res.status(404).send({
			success: false,
			message: 'Invalid Password'
		});

	res.send(faculty);
};
