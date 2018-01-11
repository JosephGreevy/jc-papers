const express    = require("express");
const app        = express();
const router     = express.Router();
const passport   = require("passport");
const User       = require("../models/user");
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	console.log("You need to be logged in to access this page.");
	res.redirect('/register');
}


router.get("/api/current-user", function(req, res){
	if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    } else {
        res.json(req.user);
    }
})

router.post("/register", 
	passport.authenticate("register"), function(req, res){
		console.log("Not even here");
		console.log(req.authInfo);
		res.send(req.body);
	}
);
router.post("/login", 
	passport.authenticate("login"), function(req, res){
		res.send(req.body);
	}
);
router.get('/auth/facebook', passport.authenticate('facebook', { 
  scope : ['email']
}));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook'),
    function(req, res){
    	res.redirect("/");
    }
);

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})


module.exports = router;