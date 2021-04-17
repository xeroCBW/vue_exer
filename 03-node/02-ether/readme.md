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