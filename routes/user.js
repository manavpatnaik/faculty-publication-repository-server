const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
	const users = await User.find(req.query);
	res.status(200).send({
		success: true,
		data: users
	});
});

router.get('/:id', async (req, res) => {
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
});

router.post('/', async (req, res) => {
	const user = new User(req.body);
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
});

router.delete('/:id', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
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
});

module.exports = router;
