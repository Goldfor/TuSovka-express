
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signin', new LocalStrategy({
            passReqToCallback : true,
            usernameField: 'email',
            passwordField: 'password'
        },
        function(req, email, password, done) { 
            // check in mongo if a user with username exists or not
            User.findOne({ 'email' :  email }, 
                function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (!user){
                        return done(null, false, {message: 'User Not found.'});                 
                    }
                    
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, {message: 'Invalid Password'}); // redirect back to login page
                    }

                    console.log('User Loiging succesful', email);   
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        // return bCrypt.compareSync(password, user.password);
        return user.password === password;
    }
    
}