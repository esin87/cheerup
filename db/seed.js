const mongoose = require('./connection');

const Cheerup = require('./models/Cheerup');
const User = require('./models/User');

const userSeeds = require('./user-seed.json');
const cheerupSeeds = require('./cheerup-seed.json');

//clear db of records using both models
User.deleteMany({})
	.then(() => {
		console.log('deleted all users');
		Cheerup.deleteMany({}).then(() => {
			console.log('deleted all cheerups');

			//create users
			return User.insertMany(userSeeds);
		});
	})
	.then(() => {
		console.log('inserted user seeds');
		return Cheerup.insertMany(cheerupSeeds);
	})
	.then(() => {
		console.log('inserted cheerup seeds');
		process.exit();
	})
	.catch(err => console.error(err));
