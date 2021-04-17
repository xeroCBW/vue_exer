var express = require('express');
var route = express.Router();



// 1. 调用 app 中的 get 方法
// 第一个参数是请求的路径，这里处理根路径的请求，
// 第二个参数是处理请求的回调函数，参数分别为请求和响应对象
route.get("/", (req, res) => {
  // 在回调函数里，调用响应对象的 send 方法，发送响应给客户端
  res.send("Hello World!");

});


route.post("/login", (req, res) => {

  console.log("收到请求体：", req.body);

  res.status(201).send();


});



// 这里我们用 app.delete 方法，最后返回204状态码，代表已删除
route.delete("/user/:id", (req, res) => {

  console.log("收到请求参数，id 为：", req.params.id);

  res.status(204).send();

});


// 路径后面的:id 的意思是，根路径后边的值都会作为请求的参数
// 并且赋给名为 id 的变量，（如：http://localhost:3000/3, id 的值就为3）
route.put("/user/:id", (req, res) => {
  // 打印一下请求参数的值，req.params.id
  console.log("收到请求参数，id 为：", req.params.id);
  // 再打印一下请求体
  console.log("收到请求体：", req.body);

  // 返回响应，默认是200
  res.send();

});


module.exports = route;