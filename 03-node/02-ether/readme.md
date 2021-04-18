### 初始化项目

1. 安装依赖

```

npm install express-generator -g

express myapp


npm install


npm start 启动项目


默认端口是3000

```


2. 改写入口文件

```

//改写入口文件
var http = require('http');
var server = http.createServer(app);



//不用暴露出去,直接监听端口
// module.exports = app;


server.listen(3000)

```


3. 安装数据库

```

npm install mysql --save


创建数据库 exapp



创建 util/dbconfig.js

const mysql = require('mysql')

module.exports ={

  config:{
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'exapp'
  },

//  链接数据库,使用mysql
  
  sqlConnet:function (sql,sqlArr,callBack) {

    var pool = mysql.createPool(this.config)
    pool.getConnection((err,conn)=>{
      if(err){
        console.log('链接失败')
        return
      }
    //  事件驱动回调
      conn.query(sql,sqlArr,callBack);
      conn.release();
    })
    
  }


}



```


````

  var sql = 'select * from image'

  var sqlArr = []

  var callBack = (err,data)=>{
    if(err){
      console.log('链接出错')
    }else{
      res.send({
        'data':data,
        'meta':{
          status:200,
          msg:'请求成功'
        }
      })
    }
  }

  dbConfig.sqlConnet(sql,sqlArr,callBack)

````

4. 设置热启动

```

npm i nodemon -g

nodemon app.js


```



5. post 请求

```

 npm i body-parser --save

安装 


```



6. 生成 token


```


npm install jsonwebtoken -S   //JWT生成Token

npm install express-jwt -S   //JWT生成的Token的验证和解析


const expressJwt = require("jsonwebtoken");
let token = expressJwt.sign({username:username},'infonet',{
        // 过期时间
        expiresIn:"24h",
      })



在 app.js 设置拦截

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


```


7. 设置跨域


```

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


```
