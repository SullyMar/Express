var config = require('config');
 const express = require('express');
 const morgan = require('morgan');
 const compress = require('compression');
 const bodyParser = require('body-parser');
 const methodOverride = require('method-override');
 const session = require('express-session');

module.exports = function() {
 var app = express();

 if (process.env.NODE_ENV === 'development') { //if value for NODE_ENV key is development do this
 app.use(morgan('dev'));
 } else if (process.env.NODE_ENV === 'production') { // if value for NODE_ENV is production do this
 app.use(compress());
 }

 app.use(bodyParser.urlencoded({ // mount the bodyparser and parse URL-encoded data from incoming HTTP requests.
 extended: true // controls how data is parsed, allows for complex objects and arrays to be included in the form data. uses the qs library
 }));
 app.use(bodyParser.json()); //parse JSON data from incoming http requests
 app.use(methodOverride()); // configure methodOverride in this express application

 const sessionSecret='developmentSessionSecret';
 app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: sessionSecret
    }));
   
 app.set('views', './app/views');
 app.set('view engine', 'ejs');

 app.use('/', require('../app/routes/index.server.routes.js'));
 app.use(express.static('./public')); // adding static file support
 app.use(express.static("./node_modules"));
 return app;
};
// Textbook page 67 explanation for the above