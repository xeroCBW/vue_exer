function test01() {

    console.log("test02 is start...")
    require('./test01')
    console.log("test02 is end...")

}

function test02(){
    //测试if

    var a = 10
    if (a > 100){
        console.log("a is greater than 100")
    }else{
        console.log("a is smaller than 100")
    }
}


function test03(){

    //测试while
    //直接输出 0 ~ 9
    index = 0
    while (index < 10){

        console.log(index)
        index ++;
    }
}



function test04() {


    var sum = 0

    //i 只是一个索引
    for (let i = 1;i<=10;i++){
        sum += i
    }

    console.log(sum)
}


function test05() {

    var a = [1,2,3]
    for (const x in a){
        console.log(a[x])
    }
}


function test06(){

    //使用for 来遍历map
    var a = new Map(
        [
            ["name",'cbw'],
            ["age",10]
        ]
    )
    for (let[key ,value] of a){
        console.log(key+"-----"+value)
    }
}

function test07(){

//    这个是用来遍历对象元素的

//    来遍历对象元素

    var a = [1,2,3,4]
    for (let x of a){
        console.log(x)
    }
}


function test08(){

    //用来测试break
    for(let i = 0;i < 10; i++){
        if (i == 5)break;
        console.log(i)
    }
}

function test09(){
//    用来测试 continue
    for (let i =0; i<10;i++){
        //遇到5 就continue 不进行输出
        if ( i == 5)continue;
        console.log(i)
    }
}


function test10() {

//    测试数据

    let a = 100
    switch(a){
        case 10:
            console.log("this is 10")
            break;
        case 20:
            console.log("this is 20")
            break
        default:
            console.log("this is default")
    }
}


function test11() {

//    测试数组
//     1,2,3,4
//     1,2,3
//     2,3

    a = [1,2,3,4]
    console.log(a.toString())
    a.pop()
    console.log(a.toString())
    a.shift()
    console.log(a.toString())
}

function test12(){

   let a = ["a","b",'c']
    console.log(a.toString())
    a.pop()
    console.log(a.toString())
}

function test13(){

    let a = [1,"a","b",2]
    console.log(a)
    console.log(a.toString())
}

function test14() {

//    一定要使用 enti ,否者会报错
//    遍历素组
    let a = [1,2,3]
    for (const [key,v] of a.entries()){
        console.log(key,'-----',v)
    }
//    0 ----- 1
// 1 ----- 2
// 2 ----- 3
}


function test15() {

//    测试基本数据
    var a = [1,3,5,2,4]
    console.log(a.reverse())
    console.log(a.sort())
//    [ 4, 2, 5, 3, 1 ]
// [ 1, 2, 3, 4, 5 ]
    
}


function test16(){

//    测试基本数据
//    这个都会将原来的数组改变
    let a = [1,3,5,2,4]
    console.log(a)
    console.log(a.reverse())
    console.log(a)
    console.log(a.sort())
    console.log(a)
}

function test17(){

    //eval 用来执行字符串
    let msg = "hello world"
    //hello world
    eval("console.log(msg)")

}



function test18(){

    //这个特性可以让 eavl在全局作用域中执行
    // eval()可以让写在函数里的代码运行在全局作用域中。
    eval("function sayHi(){console.log('hello world')}")
    //eval执行之后，会有sayHi 语句的
    sayHi()
}


function test19() {

//    测试全局作用域
//    map 都是以数组的形式展示出来的
    let a = new Map(
        [
            [1,"ccc"],
            [2,"bbb"],
            [3,'aaa']
        ]
    );
    console.log(a)
}


function test20() {

    let a = new Map()
    a.set("x","123")
    for (let [k,v] of a){
        console.log(k,v)
    }
}



function test21(num){

    if(num <= 1)return 1;
    return num + test21(num -1)

}


function test22(){

    console.log(test21(10));
    console.log(test21(20));
}




function test23(){

  const a = new Set();
  for (let i =0;i<10;i++){
    a.add(10+i)
  }

  a.forEach((item,index)=>{
    console.log(item,index)
  })
  console.log(a)


}


function test24(){

  const a = [1,2,4]
  console.log(typeof a)
  console.log(a.length)

  a.forEach((item,index)=>{
    //前面是item ,后面是index
    console.log(index,item)
  })

}



function test25(){


  let a = new Map([
    [1,'hello'],
    [2,'world'],
    [3,'sb']
  ])

  console.log(a)
  a.forEach((v,k)=>{
    console.log(k,v)
  })

}

function test26(){

  let a ={
    1:'q',
    2:'w'
  }

  console.log(a)


  for (let aKey in a) {
    console.log(aKey)
  }

  console.log('----------')

  for(let x in a){
    console.log(a[x])
  }
}



function test27(){



  //js 对象的属性都是 字符串

  //
  // {
  //   0:"value",
  //   op:"value"
  // }
  // 等价于
  // {
  // ”0“:"value",
	// “op”:"value"
  // }


  //作为属性，都key 可以不用 括号
  let a = {
    hello:1,
    world:2
  }

  for (let aKey in a) {
    console.log(aKey)
    console.log(typeof aKey)

    console.log('--------')
  }


  let hello  = "uuuu"
  console.log(hello)



  // console.log(a)
}


// test01()

// test02()

// test03()

//测试for 进行累加
// test04()

// test05()

// test06()

// test07()

// test08()

// test09()

//测试 switch case 语句
// test10()

// test11()

//测试字符串数组
// test12()

// test13()

// test14()

// test15()
//使用 reverse 和 sort
// test16()

// test17()

// test18()

// test19();

// test20();

//递归调用
// test22()

//测试数组
// test23()

// test24()

//测试map
// test25()


// test26()

test27()

