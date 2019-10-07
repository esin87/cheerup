const mongoose = require('./connection');

const Cheerup = require('./models/Cheerup');
const User = require('./models/User');

const cheerupSeeds = require('./cheerup-seed.json');

//clear db of cheerup seeds
Cheerup.deleteMany({})
	.then(() => {
		console.log('deleted all cheerups');
		return Cheerup.insertMany(cheerupSeeds);
	})
	.then(() => {
		console.log('inserted cheerup seeds');
		process.exit();
	})
	.catch(err => console.error(err));
