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



#### 6. 路由

路由都是向下匹配的,上一条匹配了,然后就不会继续匹配了


