const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const FacultySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Faculty name is required' ],
		trim: true,
		minlength: [ 3, 'Name must contain atleast 3 characters' ],
		maxlength: [ 20, 'Name must contain atmost 20 characters' ]
	},
	email: {
		type: String,
		required: [ true, 'Faculty email is required' ],
		unique: [ true, 'That email is already in use' ],
		trim: true,
		index: true
	},
	password: {
		type: String,
		required: [ true, 'Password is required' ],
		minlength: [ 6, 'Password must be atleast 6 characters long' ]
	},
	socialLinks: {
		type: [ String ],
		default: []
	},
	institution: {
		type: [ String ],
		required: [ true, 'Institution name is required' ]
	},
	department: {
		type: String
	},
	specialization: {
		type: [ String ]
	},
	followerCount: {
		type: Number,
		default: 0
	}
});

FacultySchema.pre('save', async function() {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(this.password, salt);
	this.password = hashedPassword;
});

FacultySchema.methods.matchPassword = async function(password) {
	const doesMatch = await bcrypt.compare(password, this.password);
	return doesMatch;
};

const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;
