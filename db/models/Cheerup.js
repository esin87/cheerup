const mongoose = require('../db/connection');

const CheerupSchema = new mongoose.Schema({
	body: { type: String, required: true },
	likedBy: [{ ref: 'User', type: mongoose.Schema.Types.ObjectId }]
});

const Cheerup = mongoose.model('Cheerup', CheerupSchema);

module.exports = Cheerup;
