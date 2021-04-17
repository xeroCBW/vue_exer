const expressJwt = require("jsonwebtoken");
var dbConfig = require('../util/dbconfig')




login = (req,res)=>{


  let username = req.body.username
  let password = req.body.password

  if (username == null || username.trim() == '' || password == null || password.trim() == '') {
    res.send({code: 500, message: '用户名密码不能为空'})
    return
  }


  let token = expressJwt.sign({username:username},'infonet',{
      // 过期时间
      expiresIn:"24h",
    })

  let response = {
    data:{
      username:username,
      password:password,
      token:token
    },
    meta:{
      msg:'登录成功',
      status:200
    }
  }


  return res.status(200).json(response)






  // res.send({
  //   username:username,
  //   password:password
  // })



  // var sql = 'select * from image'
  //
  // var sqlArr = []
  //
  // var callBack = (err,data)=>{
  //
  //
  //
  //   if(err){
  //     console.log('链接出错')
  //   }else{
  //     res.send({
  //       'data':data,
  //       'meta':{
  //         status:200,
  //         msg:'请求成功'
  //       }
  //     })
  //   }
  //
  //
  // }
  //
  // dbConfig.sqlConnet(sql,sqlArr,callBack)


}



module.exports = {

  login

}
