const mongoose = require('../db/connection.js');

const UserSchema = mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 15
	},
	likes: [
		{
			ref: 'Cheerup',
			type: mongoose.Schema.Types.ObjectId
		}
	]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
