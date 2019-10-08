const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');

const Cheerup = require('../db/models/Cheerup');
const User = require('../db/models/User');

// GET /signup
router.get('/signup', (req, res) => {
	res.render('signup.hbs', { message: req.flash('signupMessage') });
});

// POST /signup
router.post('/signup', (req, res) => {
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect: router.get('/:id', (req, res) => {
			User.findOne({ _id: req.params.id }).then(res.render('userhome'));
		}),
		failureRedirect: '/users/signup',
		failureFlash: true
	});

	return signupStrategy(req, res);
});

// GET /login
router.get('/login', (req, res) => {
	res.render('login.hbs', { message: req.flash('loginMessage') });
});

// POST /login
router.post('/login', (req, res) => {
	var loginProperty = passport.authenticate('local-login', {
		successRedirect: router.get('/:id', (req, res) => {
			User.findOne({ _id: req.params.id }).then(res.render('userhome'));
		}),
		failureRedirect: '/users/login',
		failureFlash: true
	});

	return loginProperty(req, res);
});
// GET /logout
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

//GET create page
router.get('/create/', (req, res) => {
	res.render('create');
});

//create new cheerup
router.post('/create/', (req, res) => {
	Cheerup.create(req.body).then(cheerup => {
		//User.user
		console.log({ cheerup });
		res.redirect('userhome');
	});
});

// Restricted page create/update/delete functionality
router.get('/', (req, res) => {
	User.findOne({ _id: req.params.id }).then(res.render('userhome'));
});

module.exports = router;
