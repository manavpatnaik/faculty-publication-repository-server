const User = require('../models/User');
const { sendWelcomeMail } = require('../utils/sendMail');

// Get all users
exports.getAllUsers = async (req, res) => {
	const users = await User.find(req.query);
	res.status(200).send({
		success: true,
		data: users
	});
};

// Create single user
exports.createUser = async (req, res) => {
	const user = new User(req.body);
	sendWelcomeMail(user.email, user.name);
	try {
		await user.save();
		res.status(200).send({
			success: true,
			message: '',
			data: user
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
};

// Get single user
exports.getSingleUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		res.send({
			success: true,
			message: '',
			data: user
		});
	} catch (err) {
		res.send({
			success: false,
			message: err.message
		});
	}
};

// Delete single user
exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.deleteOne({ _id: id });
	try {
		res.status(200).send({
			success: true,
			message: '',
			data: user
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
};

// Login user using email and password
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res.status(400).send({
			success: false,
			message: 'Please provide email and password'
		});

	const user = await User.findOne({ email });
	if (!user)
		return res.status(401).send({
			success: false,
			message: 'Invalid Credentials'
		});

	const isPasswordValid = await user.matchPassword(password);
	if (!isPasswordValid)
		return res.status(401).send({
			success: false,
			message: 'Invalid Credentials'
		});

	const token = await user.getSignedJwt();

	res.status(200).send({
		success: true,
		data: token
	});
};
