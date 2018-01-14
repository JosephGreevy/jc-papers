// NPM Packages
const express 				= require("express");
const app     				= express();
const path          		= require("path");
const bodyParser    		= require("body-parser");
const mongoose      		= require("mongoose");
const methodOverride        = require("method-override");
const flash                 = require("connect-flash");
const expressSession        = require("express-session");
const passport              = require("passport");
const LocalStrategy         = require("passport-local");

const db            		= require("./config/db");
const routes                = require("./config/routes");
const User                  = require("./models/user");
const passportConfig        = require("./config/passport");

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
// Passport initialization
app.use(expressSession({
	secret: "Manchester City are still alive here. Ballotelli, Aguerooooooooooooooo!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Point static path to directory called Dist. Connects front-end to backend.
app.use(express.static(path.join(__dirname, 'dist')));

app.use(routes);


// passport.use(new LocalStrategy(
// 	function(username, password, done){
// 		console.log("Input = " + username)
// 		User.find( {$or:[ {username : username}, {email : username }]}, function(err, user){

// 			if (err) { return done(err); }
//       		if (!user) { return done(null, false); }
//       		if (!user.verifyPassword(password)) { return done(null, false); }
//       		return done(null, user);
// 		});
// 	}
// ));
passportConfig(passport);



// Send everyything to list page
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const port = process.env.PORT || '5000';  //port setting
app.set('port', port);
app.listen(port, ()=> console.log(`Listening at localhost:${port}`));