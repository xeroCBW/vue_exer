const fs = require('fs')



//创建目录
function  test02() {

  const dir = "./css"
  fs.access(dir,(err)=>{
    if (err){
      console.log(err);
      return
    }
    console.log("存在");
    fs.rmdir(dir,error=>{

      if (error){
        console.log(error);
        return
      }
      console.log("删除成功");

    })
  })


  fs.mkdir(dir,(err)=>{
    if (err){

      console.log("遇到错误");
      return
    }

    console.log("创建成功")
  })

}



test02()