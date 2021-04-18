const fs = require('fs')


async function getZhihuColumn(id) {


  const fetch = require('node-fetch')

  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
  const response = await fetch(url)
  const column = await response.json()


  // console.log(response)
  // console.log(column)

  return column

}


// getZhihuColumn('feweekly').then(column =>{
//   console.log(column)
// })




function test02() {


  //resolve 是成功
  // reject 是失败
  new Promise((resolve,reject)=>{
    setTimeout(function () {
      //调用成功的函数
      resolve(123)
    },1000)
  }).then(res=>{console.log(res)}).catch(err=>{console.log(err)})


  
}


// test02()



function readfile(path) {

  //resolve 表示成功
  //reject 表示失败

  return new Promise((resolve,reject)=>{
  //  表示成功或者失败的回调

    fs.readFile(path,(err,data)=>{

      if(err){
        reject(err)
        return
      }
      resolve(data)
    })
  })

}


function test03() {

  //如果有错误,就打印错误
  readfile('1.txt').then((data)=>{
    console.log(data.toString())
  }).catch(err=>{
    console.log(err)
  });
}

async function test04() {

  //使用 try_catch 来搞定错误的回调
  try {
    const data_succ = await readfile('../1.txt')
    console.log(data_succ.toString())
  }catch (e) {
    console.log(e)
  }

}


test04()