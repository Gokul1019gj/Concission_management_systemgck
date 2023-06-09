var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fileUpload=require('express-fileupload')
var db=require('./config/connection')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session')
var expHBS=require('express-handlebars')
var helpers=require('handlebars-helpers')();
db.connect((err)=>{
  if(err)
  console.log('error')
  else
  console.log(' database success')
})

var userRouter = require('./routes/user');
var clgadminRouter = require('./routes/clgadmin');
var ksrtcadminRouter = require('./routes/ksrtcadmin');

var app = express();

var hbs=expHBS.create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partials',
  helpers:helpers

})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine)
  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload())
app.use(session({secret:'key',cookie:{maxAge:600000}}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);
app.use('/clgadmin', clgadminRouter);
app.use('/ksrtcadmin', ksrtcadminRouter);

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
