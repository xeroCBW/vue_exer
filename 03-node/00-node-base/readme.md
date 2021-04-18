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


#### 6.  






