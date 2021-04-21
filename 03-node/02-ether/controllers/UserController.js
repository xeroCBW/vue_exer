const expressJwt = require("jsonwebtoken");
var dbConfig = require('../util/dbconfig')
const chain_tools = require('../util/chain_tools')
const config = require("../config/config")


login = (req,res)=>{


  let username = req.body.username
  let password = req.body.password

  if (username == null || username.trim() == '' || password == null || password.trim() == '') {
    res.send({code: 500, message: '用户名密码不能为空'})
    return
  }


  console.log('登录中---------')

  chain_tools.AC_Contract.methods.Log_In(chain_tools.AdminAddr,username,password).call(function(err,r){


    console.log('返回中....')
    console.log(r)

    const  is_amdin = r['admin']

    if(r[0] == true){

      let token = expressJwt.sign({username:username},config.JWT_KEY,{
        // 过期时间
        expiresIn:"24h",
      })

      let response = {
        data:{
          username:username,
          is_amdin:is_amdin,
          token:token
        },
        meta:{
          msg:'登录成功',
          status:200
        }
      };

      return res.status(200).json(response)

    }else {

      let response = {
        data:'账户或密码错误',
        meta:{
          msg:'登录失败',
          status:400
        }
      };

      return res.json(response)

    }

  })
}




//注册模块
register=(req,res)=>{

  let { school_name, username, password } = req.body
  
  
  console.log(school_name, username, password );

  chain_tools.web3.eth.personal.unlockAccount(chain_tools.AdminAddr, chain_tools.AdminPassword, function () {
    chain_tools.AC_Contract.methods.Application_Registration(school_name, username, password).send({ from:chain_tools.AdminAddr })
      .then(async function (myContactInstance) {
        console.log("Remove successfully.")
        return res.json(
          {
            'data': null,
            'meta': {
              'msg': '注册提交成功',
              'status': 0
            }
          }
        )
      })
      .catch(err => {
        console.log("Error: failed to Remove, detail:", err)
        return res.json({
          'data': null,
          'meta': {
            msg: '注册提交失败',
            'status': 1
          }
        })
      })
  })

}


module.exports = {

  login,
  register

}
