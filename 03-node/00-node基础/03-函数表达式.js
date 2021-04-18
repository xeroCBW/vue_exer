function sayHI() {
  console.log("你好");
}

var sayBye = function (name) {
  console.log("say bye " + name);
}

//调用
// sayHI()
// sayBye()

//回调函数
function callFunction(fun,name) {
  //使用参数
  fun(name)
}



callFunction(sayBye,'cbw')







