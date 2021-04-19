const expressJwt = require("jsonwebtoken");
var dbConfig = require('../util/dbconfig')



certifate_chain = (req,res)=>{


  let admissionTime = req.body.admissionTime;
  let cerNum = req.body.cerNum;
  let graduateTime = req.body.graduateTime;
  let idNum = req.body.idNum;
  let level = req.body.level;
  let major = req.body.major;
  let name = req.body.name;
  let schoolName = req.body.schoolName;


  var err_arr = []

  if(!admissionTime){
    err_arr.push('请填写正确的admissionTime')
  }
  if(!cerNum){
    err_arr.push('请填写正确的cerNum')
  }
  if(!graduateTime){
    err_arr.push('请填写正确的graduateTime')
  }
  if(!idNum){
    err_arr.push('请填写正确的idNum')
  }
  if(!level){
    err_arr.push('请填写正确的level')
  }
  if(!major){
    err_arr.push('请填写正确的major')
  }
  if(!name){
    err_arr.push('请填写正确的name')
  }
  if(!schoolName){
    err_arr.push('请填写正确的schoolName')
  }

  if(err_arr.length){
    return res.status(400).json({
      data:err_arr,
      meta:{
        msg:'数据错误',
        status:400
      }
    })
  }


  //调用上链




  return res.status(200).json({
    data:1,
    meta:{
      msg:'证书上链成功',
      status:200
    }
  })

}



module.exports = {

  certifate_chain

}
