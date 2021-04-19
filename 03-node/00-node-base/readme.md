## 管理工具

### 后台运行
#### 1. supervisor


```

npm i supervisor -g


supervisor app.js
```

#### 2. pm2

```

pm2 app.js


```

#### 3. nohup node xxx.js &



### 模块

模块分成两大类:
- 一个是核心模块, 引用的库 node_modules中
- 一个是文件模块,自己编写的文件


#### 1. commonJS

```

便于统一,像 python那样,不再是小脚本

文件规范 :

package.json
bin : 二进制文件
lib : 存放javaScript 代码
doc : 存放文档


```


#### 2. export

```

//一个属性
module.exports = xxx

//很多属性
module.exports={
  a_http:a_http
}

```


#### 3. node_modules 中导入模块不需要写相对路径

```

默认会查找 index.js 文件,
如果有package.json 会去package.json  中找入口文件

```

#### 4. 生成 package.json

```
npm init --yes

//会 生成函数的入口

{
  "name": "db",
  "version": "1.0.0",
  "description": "",
  "main": "db.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

npm i md5 会在依赖哪一行显示

{
  "name": "02-exer",
  "version": "1.0.0",
  "description": "",
  "main": "01-module-package.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "md5": "^2.3.0"
  }
}



```


#### 5. npm 

```
指定版本安装
npm install xxx@yyyy --save 

建议安装的 时候加上 --save 如果不加 save可能不会加到 dependency 上面去

"md5": "^2.3.0"
^ 表示 第一位版本号不变,后面两位取最新的
~ 表示前2位不变,最后一位取最新的
* 表示全部取最新的



npm uninstall xxx

或者 删除 package.json 中依赖

删除 node_modules

重新 npm i

npm list

查看 模块信息
npm info xxx

cnpm 安装
npm install -g cnpm -registry=https://registry.npm.taobao.org

//设置taobao源
npm config set registry http://registry.npm.taobao.org/

npm config get registry 

```


#### 6.  文件操作

```

fs.access(): 检查文件是否存在，以及 Node.js 是否有权限访问。
fs.appendFile(): 追加数据到文件。如果文件不存在，则创建文件。
fs.chmod(): 更改文件（通过传入的文件名指定）的权限。相关方法：fs.lchmod()、fs.fchmod()。
fs.chown(): 更改文件（通过传入的文件名指定）的所有者和群组。相关方法：fs.fchown()、fs.lchown()。
fs.close(): 关闭文件描述符。
fs.copyFile(): 拷贝文件。
fs.createReadStream(): 创建可读的文件流。
fs.createWriteStream(): 创建可写的文件流。
fs.link(): 新建指向文件的硬链接。
fs.mkdir(): 新建文件夹。
fs.mkdtemp(): 创建临时目录。
fs.open(): 设置文件模式。
fs.readdir(): 读取目录的内容。
fs.readFile(): 读取文件的内容。相关方法：fs.read()。
fs.readlink(): 读取符号链接的值。
fs.realpath(): 将相对的文件路径指针（.、..）解析为完整的路径。
fs.rename(): 重命名文件或文件夹。
fs.rmdir(): 删除文件夹。
fs.stat(): 返回文件（通过传入的文件名指定）的状态。相关方法：fs.fstat()、fs.lstat()。
fs.symlink(): 新建文件的符号链接。
fs.truncate(): 将传递的文件名标识的文件截断为指定的长度。相关方法：fs.ftruncate()。
fs.unlink(): 删除文件或符号链接。
fs.unwatchFile(): 停止监视文件上的更改。
fs.utimes(): 更改文件（通过传入的文件名指定）的时间戳。相关方法：fs.futimes()。
fs.watchFile(): 开始监视文件上的更改。相关方法：fs.watch()。
fs.writeFile(): 将数据写入文件。相关方法：fs.write()。

```

#### 7. mkdirp 可以创建带有层级的文件

```

var mkdirp = require('mkdirp')
mkdirp('cbw/test/01',function(){})

```


#### 8. 模板字符串

```javascript

//  使用模板字符串来编写
  var a = "cbw"
  var b = "hello world"

  var c = `${a} ..... ${b}`
  //cbw ..... hello world
  console.log(c);
```


#### 9. es6 的简写

```javascript


  //方法和属性
  var name = "cbw"

  var app = {
    "name" :name
  }
  //名字一样,可以进行简写
  var app = {
    name
  }
  

```


#### 10. promise 来处理异步的数据

```javascript
//表示有成功和失败的回调
// promise (resolve , reject)

var p = new Promise((resolve,reject)=>{

  //这里只是使用了resolve
  setTimeout(function () {
    var name = "cbw"
    resolve(name)
  },1000)

})


p.then(function (data) {
console.log(data);
})

```

#### 11. async await

```javascript

// async 用于声明异步方法
// await 需要用在异步的方法里面

//这里返回的是一个promise
async function test07(){
  return "你好 node js"
}

//这里正常调用
async function test08() {
  const a = await test07()
  console.log(a);
}

```

await 调用的是一个 proMise 方法,采用 async引用


```javascript

//判断是一个文件还是一个目录
async function isDir(path) {

  return new Promise((resolve,reject)=>{

    fs.stat(path,(error,stats)=>{

      if(error){
        console.log(error)
        reject(error)
        return
      }
      if(stats.isDirectory()){
        resolve(true)
      }else {
        resolve(false)
      }
    })
  })
}

async function test09() {

  const res = await isDir("./1.txt")
  console.log(res);
  
}

```





### 常见问题
[webstorm不能识别一些js方法，如require](https://blog.csdn.net/wang124454731/article/details/53525030)
![](https://img-blog.csdn.net/20161208213239665?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2FuZzEyNDQ1NDczMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![](https://img-blog.csdn.net/20161208213603872?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2FuZzEyNDQ1NDczMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

下载之后就会有各种代码提示了