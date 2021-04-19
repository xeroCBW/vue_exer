## 安装教程

### 1. 安装

```powershell

npm install express-generator -g

express xxx

cd xxx

npm install 

node app.js

```


#### 2. 设置不同的路由路径

```

//注意:前面的:id路由会挡住后面的get路由
app.get("/article/:id",(req,res)=>{

var id = req.params["id"]
res.send("动态路由" + id)

})




app.get("/article/get",(req,res)=>{

var id = req.params["id"]
res.send("动态路由" + id)

})

```



#### 3. 请求的req res



所有的请求都绕不开 req 和 res

```javascript

app.get("/article/:id",(req,res)=>{

var id = req.params["id"]
res.send("动态路由" + id)

})

```



#### 4. 模板引擎

1. ejs
2. jade

```

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.set('view engine', 'ejs');

```


#### 5. 中间件

##### 5.1. 应用级中间件

```javascript

app.use(function (req,res,next) {

  //在这里可以对请求进行拦截
  
  next()
})

```

##### 5.2. 路由级中间件

```javascript

app.get("/xxx",function (req,res,next) {

  //直接向下执行,继续执行往后的路由
  next()
})


```

##### 3. 错误中间件

```javascript


app.use(function (req,res,next) {

  //在这里可以对请求进行拦截
  
  //这里就不在设置next 最后所有的路由都执行完了
  // next()
})

```

##### 4. 内置中间件

设置静态文件的加载,http://127.0.0.1:3000/stylesheets/style.css
访问这个地址,可以直接访问静态文件

```javascript

app.use(express.static(path.join(__dirname, 'public')));

```



#### 6. 路由

路由都是向下匹配的,上一条匹配了,然后就不会继续匹配了



#### 7. 获取传值

##### 7.1 get 传值

req.query

```

http://127.0.0.1:3000/article/get?id=1&num=2

var get_article = function (req,res) {
//{ id: '1', num: '2' }
  console.log(req.query)
  res.json({
    data:"get_article"
  })
}


```

##### 7.2 post 传值

req.body

```

const login = function (req,res) {
//{ username: 'admin', password: 'admin' }
  console.log(req.body)
  res.send({
    data:"hell0",
    meta:{
      msg:"success",
      status:200
    }
  })


}


```

##### 7.3 解析传值的工具

主要是post 请求来接收

```shell
npm install body-parser
```



### 8. 使用cookie


#### 8.1 安装


```
npm install cookie-parser

var express = require('express')
var cookieParser = require('cookie-parser')
 
var app = express()
app.use(cookieParser())

```


#### 8.2 设置过期


```
//设置 cookie, 一小时过期 ,cookie 的路径为 test
res.cookie("username","张三",{maxAge:60*60*1000,"path":"/test"})

//获取cookie
let user = req.cookie.username 

```





### 模块化路由

```
//生成挂载路由
var express = require('express');
var router = express.Router();
const user = require("../controller/UserController")

//设置路由的路径
router.post('/user/login', user.login);

//输出路由
module.exports = router;

```

