const Publication = require('../models/Publication');

exports.getAllPublications = async (req, res) => {
	const publications = await Publication.find(req.query);
	res.send({
		success: true,
		data: publications
	});
};

exports.getSinglePublication = async (req, res) => {
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
};

exports.createPublication = async (req, res) => {
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
};

exports.deletePublication = async (req, res) => {
	const { id } = req.params;
	try {
		const publication = await Publication.deleteOne({ _id: id }, { returnOriginal: true });
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
};

exports.getPublicationByFaculty = async (req, res) => {
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
};
