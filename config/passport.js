var LocalStrategy = require('passport-local').Strategy;
var User = require('../db/models/User');

module.exports = function(passport) {
	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},
			function(req, email, password, callback) {
				User.findOne({ 'local.email': email }, function(err, user) {
					if (err) return callback(err);

					if (user) {
						return callback(
							null,
							false,
							req.flash(
								'signupMessage',
								'hey friend, that email is already taken!'
							)
						);
					} else {
						let newUser = new User();
						newUser.local.email = email;
						newUser.local.password = newUser.encrypt(password);

						newUser.save(function(err) {
							if (err) throw err;
							return callback(null, newUser);
						});
					}
				});
			}
		)
	);

	passport.use(
		'local-login',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},
			function(req, email, password, callback) {
				User.findOne({ 'local.email': email }, function(err, user) {
					if (err) return callback(err);

					if (!user) {
						return callback(
							null,
							false,
							req.flash('loginMessage', 'no user found.')
						);
					}
					if (!user.validPassword(password)) {
						return callback(
							null,
							false,
							req.flash('loginMessage', 'oops, wrong password!')
						);
					}
					return callback(null, user);
				});
			}
		)
	);
};
