const express = require('express');
const router = express.Router();

const Cheerup = require('../db/models/Cheerup');
const User = require('../db/models/User');

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/show', (req, res) => {
	//use aggregate sample method to return random cheerup
	Cheerup.aggregate([{ $sample: { size: 1 } }])
		.then(cheerup => {
			return cheerup[0];
		})
		.then(cheerup => {
			console.log(cheerup);
			res.render('showcheerup', { cheerup });
		})
		.catch(err => console.error(err));
});

module.exports = router;
