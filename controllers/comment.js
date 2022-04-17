const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
	const comments = await Comment.find(req.query);
	res.status(200).send({
		success: true,
		data: comments
	});
};

exports.createComment = async (req, res) => {
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
};

exports.getSingleComment = async (req, res) => {
	const { id } = req.params;
	try {
		const comment = await Comment.findById(id);
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
};

exports.deleteComment = async (req, res) => {
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
};

exports.getCommentsByUser = async (req, res) => {
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
};

exports.getCommentsOnPublication = async (req, res) => {
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
};
