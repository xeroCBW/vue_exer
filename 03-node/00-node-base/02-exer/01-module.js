//注意路径问题
const a_http = require('./01-module-package')
const md5 = require('md5')
const  sd = require('silly-datetime')
const fs = require('fs')

function test01() {
  a_http.a_http.get()
  a_http.a_http.post()
}



function test02() {
  //{ a_http: { get: [Function: get], post: [Function: post] } }
  console.log(a_http)
  //object
  console.log(typeof a_http);
  //object
  console.log(typeof a_http.a_http);
//undefined
  console.log(typeof a_http.a_http.get());
  
}



function test03(){

  var a = "123"
  //为什么会有括号,主要是导出的是一个方法
  console.log(md5(a))

}



function test04(){


  //2021-04-18T11:37:29.356Z
  // 2021-04-18 19:37:29
  var a = new Date()
  console.log(a)
  var b = sd.format(a,"YYYY-MM-DD HH:mm:ss")
    console.log(b);

}


function test05() {

  fs.stat('package.json',(err,data)=>{

  })
  
}


//进行测试
// test01()

//测试各个的属性
// test02()


// test03()


// test04()



test05()
