var createError = require('http-errors');
var express = require('express');
const jwt = require("jsonwebtoken");
//路径插件
var path = require('path');
//配置post请求解析
const bodyParser = require('body-parser')
//配置 配置常量
const config = require('./config/config')
//日志插件
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



//初始化app
var app = express();

//设置跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


//验证token中间件
app.use((req, res, next) => {

  //放行请求路径为:/login的请求
  if(req.url === '/login'
    || req.url === '/register'
    || req.url === '/certification/query'
    || req.url === '/certification/queryDetail'
  ){
    next()
    return
  }

  //拦截初login之外其他请求
  const token = req.headers['authorization']// 获取请求header中token
  const decode_token = jwt.decode(token,config.JWT_KEY)//对 token 进行解密

  const ip = req.ip
  const method = req.method
  const path = req.path
  const query = req.query
  const body = req.body

  console.log(ip,path,method,query,body)
  console.log('token....',token,decode_token);

  // 验证token
  if(token === undefined  || decode_token === null) {//请求没有设置token或者无效

    res.send({
      data:null,
      meta:{
        msg:'token 无效',
        status:403
      }
    });
    return
  }

  //验证token是否过期,默认 24h
  const end_time = parseInt(decode_token.exp);
  const cur_time = new Date().getTime()/1000;
//过期,超时了
  if (cur_time > end_time){
    res.send({
      data:null,
      meta:{
        msg:'token 过期了',
        status:403
      }
    });
    return
  }

  //token有效,直接下发
  next()

});


//改写入口文件
var http = require('http');
var server = http.createServer(app);

//静态资源
app.use(express.static(path.join(__dirname, 'public')));

//将请求转换成json格式
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);


// 错误处理中间件
app.use((err,req,res,next) =>{
  console.log(err)
  // console.error(err.stack);
  res.send(err.message)
})


// 错误处理中间件
server.listen(3000)
console.log('已启动... ,地址为:http://localhost:3000')