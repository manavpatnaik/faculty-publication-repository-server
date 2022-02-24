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
		}
	},
	{ timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
