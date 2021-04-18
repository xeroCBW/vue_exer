var createError = require('http-errors');
var express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')
//node跨域设置
const cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//初始化app
var app = express();
//----- 配置跨域 -----
// express框架解决跨域问题的代码，注意该代码要放在 app.use(router); 之前
// app.all('*', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", 'Express');
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


//验证登录-------
app.use((req, res, next) => {

  //登录直接过
  if(req.url === '/login'){
    next()
    return
  }
  const token = req.headers['authorization']
  const username = jwt.decode(token,'infonet')
  if(token == undefined  || username == null) {

    res.status(403).send({
      data:null,
      meta:{
        msg:'token 无效',
        status:403
      }
    })
    return
  }
  //直接下发
  next()

});


//改写入口文件
var http = require('http');
var server = http.createServer(app);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态资源
app.use(express.static(path.join(__dirname, 'public')));
//将请求转换成json格式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);


// 错误处理中间件
app.use((err,req,res,next) =>{
  res.status(500).send(err.message)
})


// 错误处理中间件
server.listen(3000)
console.log('已启动... ,地址为:http://localhost:3000')