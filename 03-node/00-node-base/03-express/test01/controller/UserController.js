const login = function (req,res) {


  res.cookie("username","张三",{maxAge:60*60*24})

  console.log(req.body)

  res.send({
    data:"hell0",
    meta:{
      msg:"success",
      status:200
    }
  })


}




module.exports={
  login
}