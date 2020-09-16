const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const session = require('express-session'); 
const flash = require('connect-flash');
const cors = require('cors');
const escapeJSON = require('escape-json-node');
const authRouter = require('./src/routes/auth'); 

const sequelize = require('./models').sequelize;

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


app.use('/auth', authRouter); 

//image 사용 할 수 있게 만들어주는 static 
app.use('/img', express.static('uploads'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// view Engine 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error pag
  res.status(err.status || 500);
 
  res.json({
    message: err.message,
    error: err
  });

});




module.exports = app;

