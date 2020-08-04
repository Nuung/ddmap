const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const session = require('session'); 
const flash = requrie('connect-flash');
const cors = require('cors');
const escapeJSON = require('escape-json-node');
const formRouter = require('./src/routes/formRoutes');
const {sequelize} = require('./models')
// sns login 
const passport = require('passport'); 


sequelize.sync(); 

const passportConfig = require('./passport'); 


//add .env file 
require('dotenv').config(); 

passportConfig(passport); 

const app = express();

app.use(logger('dev'));

app.use(express.json()); // body-parser setting ~ express include body-parser from 4.X version
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors()); // CORS 설정

formRouter(app);

//app session 

app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly:true, 
    secure: false, 
  },
}));

app.use(flash()); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use('/', formRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

