const router = require('express').Router();
const Publication = require('../models/Publication');

router.get('/', async (req, res) => {
	const publications = await Publication.find(req.query);
	res.send({
		success: true,
		data: publications
	});
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const publication = await Publication.findById(id);
		res.send({
			success: true,
			message: '',
			data: publication
		});
	} catch (err) {
		res.send({
			success: false,
			message: err.message
		});
	}
});

router.post('/', async (req, res) => {
	const publication = new Publication(req.body);
	try {
		await publication.save();
		res.status(200).send({
			success: true,
			message: '',
			data: publication
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
	try {
		const publication = await Publication.deleteOne({ _id: id }, {returnOriginal: true});
		res.status(200).send({
			success: true,
			message: '',
			data: publication
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
});

router.get('/faculty/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const publications = await Publication.find({ author: id });
		res.status(200).send({
			success: true,
			message: '',
			data: publications
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
});

module.exports = router;
