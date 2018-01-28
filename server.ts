// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

import * as bodyParser from 'body-parser';
import { mongoose }  from "./node_modules/mongoose/index.js";
import { methodOverride } from "./node_modules/method-override/index.js";
import * as expressSession from "express-session";
import * as passport from "passport";

const db   = require("./config/db.js");
const routes       = require("./config/routes.js");
const User        = require("./models/user.js");
const passportConfig = require("./config/passport.js");

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 5000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.use(expressSession({
  secret: "Manchester City are still alive here. Ballotelli, Aguerooooooooooooooo!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Server static files from /browser

app.use(routes);
passportConfig(passport);

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});







// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';

// import * as express from 'express';
// const app     				= express();
// const path          		= require("path");



// import { renderModuleFactory } from '@angular/platform-server';
// import { enableProdMode } from '@angular/core';
// import { join } from 'path';
// import { readFileSync } from 'fs';




// // Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

// const DIST_FOLDER = join(process.cwd(), 'dist');

// // Our index.html we'll use as our template
// const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// // * NOTE :: leave this as require() since this file is built Dynamically from webpack
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

// app.engine('html', (_, options, callback) => {
//   renderModuleFactory(AppServerModuleNgFactory, {
//     // Our index.html
//     document: template,
//     url: options.req.url,
//     // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
//     extraProviders: [
//       provideModuleMap(LAZY_MODULE_MAP)
//     ]
//   }).then(html => {
//     callback(null, html);
//   });
// });

// app.set('view engine', 'html');
// app.set('views', join(DIST_FOLDER, 'browser'));


// // Passport initialization
// app.use(expressSession({
// 	secret: "Manchester City are still alive here. Ballotelli, Aguerooooooooooooooo!",
// 	resave: false,
// 	saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// //Point static path to directory called Dist. Connects front-end to backend.
// //app.use(express.static(path.join(__dirname, 'dist')));

// app.use(routes);
// passportConfig(passport);

// app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// // All regular routes use the Universal engine
// app.get('*', (req, res) => {
//   res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
// });



// const port = process.env.PORT || '5000';  //port setting
// app.set('port', port);
// app.listen(port, ()=> console.log(`Listening at localhost:${port}`));
