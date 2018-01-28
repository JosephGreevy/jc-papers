const User = require("../models/user.js");
const app = require("express")();
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bCrypt        = require("bcrypt-nodejs");

var fbConfig = require("./facebook");

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
	    done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
	    User.findById(id, function(err, user) {
	        done(err, user);
	    });
	});
	passport.use("register", new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done){
			User.findOne({ $or : [
				{ "local.username" : username },
				{ "local.email"    : username }
				]
			}, function(err, user){
				if(err){
					console.log("Error while registering user", err);
					return done(err);
				}
				if(user){
					console.log("User already exists");
					app.locals.message = "error";
					return done(null, false, {
						success : false, 
						message : "The Username or Email is already taken."
					});
				}else{
					var newUser = new User();
					newUser.local.username = username;
					newUser.local.email    = req.body.email;
					newUser.local.school   = req.body.school;
					newUser.local.password = createHash(password);
					newUser.save(function(err){
						if(err){
							console.log("Error saving user to Database", err);
						}  
		                return done(null, newUser, { 
		                	success : true,
	                 		message : "Successfully registered and logged in."
	                 	});
					})
				}
			})
		})
	);
	passport.use("login", new LocalStrategy({
		passReqToCallback : true
	}, function(req, username, password, done){
		User.findOne({
			 $or : [
				{ 'local.username' : username },
				{ 'local.email'    : username }
			]
		}, function(err, user){
			if(err){
				console.log("Error while authenticating user", err);
				return done(err);
			}
			if(!user){
				console.log("Username or email is incorrect");
				return done(null, false);
			}
			if(!isValidPassword(user, password)){
				console.log("Password is incorrect");
				return done(null, false);
			}
			console.log("User is being logged in");
			return done(null, user);
		})
	}));
	passport.use(new FacebookStrategy({
		clientID : fbConfig.auth.clientID,
		clientSecret : fbConfig.auth.clientSecret,
		callbackURL : fbConfig.auth.callbackURL,
		profileFields: ['id', 'displayName', 'email']
	},
	function(accessToken, refreshToken, profile, cb){
		User.findOne({ 'facebook.id' : profile.id }, function(err, user){
			if(err)
				console.log("Error finding FB user", err);
				return cb(err)

			if(user){
				return cb(null, user);
			}else{
				var newUser = new User();
				newUser.facebook.id = profile.id;
				newUser.facebook.token = accessToken;
				newUser.facebook.name  = profile.displayName;
				newUser.facebook.email    = profile.emails[0].value;
				newUser.save(function(err){
					if(err){
						console.log("Error saving FB user to database", err);
						throw err;
					}
					console.log(newUser);   
	                return cb(null, newUser);
				})

			}
		})
	}))
}
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
var isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.local.password);
}