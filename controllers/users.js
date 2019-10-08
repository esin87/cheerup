const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');

const Cheerup = require('../db/models/Cheerup');
const User = require('../db/models/User');

router.get('/', (req, res) => {
	res.render('userhome');
});

// GET /signup
router.get('/signup', (req, res) => {
	res.render('signup.hbs', { message: req.flash('signupMessage') });
});

// POST /signup
router.post('/signup', (req, res) => {
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/users/',
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
		successRedirect: '/users/',
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

// Restricted page create/update/delete functionality
// router.get('/userhome', (req, res) => {
// 	if (req.isAuthenticated()) res.render('userhome');
// 	res.render('cheerup');
// });

module.exports = router;
