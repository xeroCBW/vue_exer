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