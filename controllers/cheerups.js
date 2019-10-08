const express = require('express');
const router = express.Router();

const Cheerup = require('../db/models/Cheerup');
const User = require('../db/models/User');

//delete a cheerup by ID
router.delete('/:id', (req, res) => {
	Cheerup.findOneAndRemove({ _id: req.params.id }).then(() => {
		res.render('userhome');
	});
});

//home page route
router.get('/', (req, res) => {
	res.render('index');
});

//about page route
router.get('/about', (req, res) => {
	res.render('about');
});

//show random cheerup to unregistered users
router.get('/show', (req, res) => {
	//use aggregate sample method to return random cheerup
	Cheerup.aggregate([{ $sample: { size: 1 } }])
		.then(cheerup => {
			return cheerup[0];
		})
		.then(cheerup => {
			res.render('showcheerup', { cheerup });
		})
		.catch(err => console.error(err));
});

//create new cheerup
router.post('/create/', (req, res) => {
	Cheerup.create(req.body).then(cheerup => {
		res.render('showcheerup', { cheerup });
	});
});

//edit cheerup by id
router.get('/edit/:id', (req, res) => {
	Cheerup.findOne({ _id: req.params.id }).then(cheerup => {
		res.render('edit', { cheerup });
	});
});

//send updates and display edited cheerup
router.put('/:id', (req, res) => {
	Cheerup.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true
	}).then(cheerup => {
		res.render('showcheerup', { cheerup });
	});
});

module.exports = router;
