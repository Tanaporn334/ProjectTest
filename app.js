var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('./db')

var indexRouter = require('./routes/index');
var registerSchema = require('./routes/register');
var loginRouter = require('./routes/login');
var productsSchema = require('./routes/product');
var approveRouter = require('./routes/approve');
var ordersSchema = require('./routes/orders');

var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/register', registerSchema);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/products', productsSchema);
app.use('/api/v1/approve', approveRouter);
app.use('/api/v1/orders', ordersSchema);

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
