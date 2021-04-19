var createError = require('http-errors');
const bodyParser = require('body-parser')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();


//设置引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//将请求转换成json格式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
//设置 log
app.use(logger('dev'));

//设置cookie
app.use(cookieParser());
//设置内置中间件
app.use(express.static(path.join(__dirname, 'public')));

//设置路由
app.use('/', indexRouter);


//设置 404
app.use(function(req, res, next) {

  //设置 404 的错误中间件
  res.send("404")
  // next(createError(404));
});

//设置 错误处理 中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;

app.listen(3000)

console.log("开始 http://127.0.0.1:3000 ");