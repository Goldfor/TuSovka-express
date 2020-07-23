var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var UserData = require('../models/userData');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true, // allows us to pass back the entire request to the callback
            usernameField: 'email',
        },
        function(req, email, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'email' :  email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp:', err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+email);
                        return done(null, false, {message: 'User Already Exists'});
                    }
                    else{
                        var newUser = new User();
                        newUser.password = createHash(password);
                        newUser.email = email;
                        newUser.verify = "0";

                        var Data = new UserData();
                        Data.email = email;

                        Data.save()
                        .then(_Data => {
                            newUser.userDate = _Data._id
                            newUser.save()
                            .then(e => {
                                console.log('User Registration succesful');    
                                return done(null, newUser);
                            })
                            .catch(err => {
                                console.log('Error in Saving user:', err);  
                                throw err; 
                            })
                        })
                        .catch(err => {
                            console.log('Error in Saving user:', err);  
                            throw err; 
                        })
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        // return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        return password;
    }

}