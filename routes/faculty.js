const router = require('express').Router();
const Faculty = require('../models/Faculty');

// Get all faculty
router.get('/', async (req, res) => {
	const faculty = await Faculty.find(req.query);
	res.send(faculty);
});

// Get single faculty by ID
router.get('/:id', async (req, res) => {
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
});

// Create faculty
router.post('/', async (req, res) => {
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
});

// Delete Faculty using ID
router.delete('/:id', async (req, res) => {
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
});

// Login user using email and password
router.post('/login', async (req, res) => {
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
});

module.exports = router;
