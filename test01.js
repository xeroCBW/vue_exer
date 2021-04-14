
function  test01() {

    console.log(123)

    var a = "123"
    var b = "hello world"
    console.log(a)
    console.log(b)

//不要将文件名字取成node.js，否者会直接打开

// 没有



//会直接报错没有定义 window 和 document

//window is not defined
// console.log(window)
// console.log(document)

}


function  test02() {

    //在 fs 这个核心模块中，就提供了所有的文件操作的api
    var fs = require('fs')

    //读取文件
    fs.readFile('xxx.md',function (error,data) {



        if(error){
            console.log("文件打开错误")
            console.log(error)
        }else {
            console.log(data.toString())
        }
    })
}

function test03(){

    var http = require("http")
    var server =  http.createServer()

    server.on('request',function () {
        console.log('收到客户端的请求了')
    })
    
    server.listen(3000,function () {

        console.log("服务器启动成功了，可以通过 http://127.0.0.1:3000/来进行访问")

    })


}




function test04(){


    var http = require('http')
    var server =  http.createServer()

    server.on('request',function (req,res) {
        console.log('收到客户端的请求了')
        console.log(req.url)


        //设置响应的数据
        res.writeHeader(200,{"Content-type":"text/html;charset=utf8"})
        res.write("请求的链接是：" + req.url)

        res.end()


    })

    server.listen(3000,function () {

        console.log("服务器启动成功了，可以通过 http://127.0.0.1:3000/来进行访问")

    })

}



function test05(){

//    根据不同的请求路径来发送不同的响应结果

    var http = require('http')
    var server = http.createServer()

    server.on('request',function (req,res) {

        res.writeHeader(200,{"Content-type":"text/html;charset=utf8"})

        var url = req.url
        if (url == '/'){
            res.write("回到首页")
        }else if(url == '/login'){
            res.write('登录页面')
        }else {
            res.write('404 没有找到页面')
        }

        res.end()

    });

    server.listen(3000,function () {
        console.log('表示服务器已经启动了，你可以通过 http://127.0.0.1:3000/ 来访问~')
    })

}



function test06(){

    ///Users/cbw/WebstormProjects/exer/test01.js
    console.log(__filename)
    ///Users/cbw/WebstormProjects/exer
    console.log(__dirname)
}



function  test07() {

    //测试暂停2s 后进行调用
    var t = setTimeout(test06,2000)
    // clearTimeout(t)
}


function  test08() {

    //暂停2s
    var t = setInterval(test06,2000)
    // clearInterval(t)
    
}


function test09() {

//    对数据进行 json化
//    输出字符串


    var http = require('http')
    server = http.createServer()


    server.on('request',function (req,res) {


        res.writeHeader(200,{"Content-type":"text/html;charset=utf8"})

        var arr = [
            {"name":"apple","price":10},
            {"name":"banana","price":10},
            {"name":"orange","price":10}
        ]

        var arr_str = JSON.stringify(arr)

        res.write(arr_str)

        res.end()
        
    });

    server.listen(3000,function () {


        console.log("服务器已经开启，地址为： http://127.0.0.1:3000/ ")
    })
}

function  test10() {

//    设置初始数据


    
}


// test01()
// test02()

// test03()


//测试浏览器
// test04()


// test05()


// test06()


//租个2s后运行，只会运行一次
// test07()

//每隔2s运行一次
// test08()

// test09()


console.log("test01 is loading")
