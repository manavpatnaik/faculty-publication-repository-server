const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
	{
		body: {
			type: String,
			required: [ true, 'A comment must have a body' ]
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [ true, 'A comment must be made by a user' ]
		},
		publication: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Publication',
			required: [ true, 'A comment can be made only on a publication' ]
		}
	},
	{ timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
