const mongoose = require('../connection.js');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
	local: {
		email: String,
		password: String
	},
	likes: [
		{
			ref: 'Cheerup',
			type: mongoose.Schema.Types.ObjectId,
			required: false
		}
	],
	userCreated: [
		{
			ref: 'Cheerup',
			type: mongoose.Schema.Types.ObjectId,
			required: false
		}
	]
});

UserSchema.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
