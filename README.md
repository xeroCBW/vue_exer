## node 
### node 基础

1. 没有 BOM 和 DOM
2. 注意不能取名 node.js，否者运行会直接打开
3. 浏览器中js是没有文件操作能力的，node有文件操作的能力
- 在node中想进行文件操作，就要引入 fs模块


## nvm 安装

1. 首先卸载所有的node 
```shell

sudo npm uninstall npm -g
sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*
sudo rm -rf /usr/local/include/node /Users/$USER/.npm
sudo rm /usr/local/bin/node
sudo rm /usr/local/share/man/man1/node.1
sudo rm /usr/local/lib/dtrace/node.d

```

2. 安装

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash复制代码

```
或者 
```angular2html
brew install nvm
```

查看是否安装成功：`nvm list`

3. 修改源

```shell
vi ~/.bash_profile

export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
export NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs

source  ~/.bash_profile
```

4. 安装node
```angular2html
nvm install node

```

5. 常见命令

```angular2html
nvm install stable # 安装最新版
nvm install --lts # 安装长期支持版
nvm ls # 列出所有已安装的版本
nvm use <version> # 使用node版本
nvm current # 当前版本
nvm # 查看命令
nvm uninstall <version> # 卸载node版本
```


## 全局对象

- __filename
```angular2html
// 输出全局变量 __filename 的值
console.log( __filename );

```

- __dirname

```angular2html
// 输出全局变量 __dirname 的值
console.log( __dirname );
```

## 常用模块

### os



```javascript
// 可以获取一些基本的信息
os.cpus()
os.freemem()
os.networkInterfaces()

```

## js文件的导入和导出

1. 导入文件会执行该文件，但是文件中的变量不能共享
2. 拿到文件的exports 接口文件对象


```javascript
exports.foo = "hello"
exports.add = function(x,y) {
  return x+y
}

```

```javascript

var bExport = require('./b.js')
console.log(bExport.foo)
console.log(bExport.add(10,30))

```



## 使用debugger 调试器

遇到debubbger 都会打开开发者面板