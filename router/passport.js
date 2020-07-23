var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){
	router.get('/signin', function(req, res, next) {
		passport.authenticate('signin', function(err, user, info) {
			if(err) {
				return next(err);
			}
			if(!user) {
				return res.json({status: 'BAD', ...info});
			}
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				return res.json(user);
			});
		  })(req, res, next);
	});

	router.get('/signup', function(req, res, next) {
		passport.authenticate('signup', function(err, user, info) {
			if(err) {
				return next(err);
			}
			if(!user) {
				return res.json({status: 'BAD', ...info});
			}
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				req.sendEmail(user.email, "hello", '<h1>Welcome</h1><p>That was easy!</p>')
				return res.json(user);
			});
		  })(req, res, next);
	});

	router.get('/account', isAuthenticated, function(req, res, next) {
		res.json(req.user);
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.json({status: 'Ok'})
	});
	return router;
}

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
	  return next();
	res.json({status: 'BAD', messenge: "Please Authenticated"});
}
