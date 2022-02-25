const Comment = require('../models/Comment');

const router = require('express').Router();

router.get('/', async (req, res) => {
	const comments = await Comment.find(req.query);
	res.send({
		success: true,
		data: comments
	});
});

router.post('/', async (req, res) => {
	const comment = new Comment(req.body);
	try {
		await comment.save();
		res.status(200).send({
			success: true,
			message: '',
			data: comment
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const comment = await Comment.findById(id);
		res.send({
			success: true,
			message: '',
			data: comment
		});
	} catch (err) {
		res.send({
			success: false,
			message: err.message
		});
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const comment = await Comment.deleteOne({ _id: id });
	try {
		res.status(200).send({
			success: true,
			message: '',
			data: comment
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
});

router.get('/user/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const comments = await Comment.find({ user: id });
		res.status(200).send({
			success: true,
			message: '',
			data: comments
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
});

router.get('/publication/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const comments = await Comment.find({ publication: id });
		res.status(200).send({
			success: true,
			message: '',
			data: comments
		});
	} catch (err) {
		res.status(400).send({
			success: false,
			message: err.message
		});
	}
})

module.exports = router;
