// let 和 const 都是块 作用域

function test01() {

  if(true){
    let a = 123
  }
  // ReferenceError: a is not defined
  //这样直接打印是要报错的,因为没有定义
  console.log(a);
}


function test02() {
  //这里就不会报错

  if(true){
    var a = 123
  }
  // ReferenceError: a is not defined
  //这样直接打印是要报错的,因为没有定义
  console.log(a);
}

function test03(){

//  使用模板字符串来编写
  var a = "cbw"
  var b = "hello world"

  var c = `${a} ..... ${b}`
  //cbw ..... hello world
  console.log(c);
}



function test04(){

  //方法和属性
  var name = "cbw"

  var app = {
    "name" :name
  }
  //这样直接赋值也可以
  app['age'] = 12

  //这里是定义了对象的属性
  console.log(app.name);
  console.log(app.age);
  console.log(typeof app);
  
  console.log(app);

}



function test05(){

  var a = new Map()
  a.set("name","cbw")
  a.set("age",12)
  console.log(a.get("name"));
  console.log(a.get("age"));

  //不是对象使用 ,会直接报undefine
  //undefined
  // undefined
  console.log(a["name"]);
  console.log(a["age"]);

}



var p = new Promise((resolve,reject)=>{

  //这里只是使用了resolve
  setTimeout(function () {
    var name = "cbw"
    resolve(name)
  },1000)

})

function test06(){
  p.then(function (data) {
    console.log(data);
  }).catch(function () {
  //  这里是reject 失败的回调
  })
}




async function test07(){

  return "你好 node js"
}

async function test08() {

  const a = await test07()
  console.log(a);
  
}

// test01()

// test02()

// test03()

test04()

// test05()

// test06()

// test08()

