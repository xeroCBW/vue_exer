const expressJwt = require("jsonwebtoken");
var dbConfig = require('../util/dbconfig')
var Web3 = require("web3")  //web3
var fs = require("fs")                      //文件读取库
var web3 = new Web3(Web3.givenProvider || 'http://172.17.16.6:8545') //连接私链
//const部分
const ContractAddr = "0x01191384a2be3586834a9078cb3d650b5a6d55e3"   //合约地址
const AdminAddr = "0x6c0496471e63c5c170760ab1011c0bd508610896" //账户地址
const ABIAdrr = "../contract.json"  //合约的ABI地址
//连接智能合约
var F = fs.readFileSync(ABIAdrr);
var abi = JSON.parse(F)
var AC_Contract = new web3.eth.Contract(abi, ContractAddr)


login = (req,res)=>{


  let username = req.body.username
  let password = req.body.password

  if (username == null || username.trim() == '' || password == null || password.trim() == '') {
    res.send({code: 500, message: '用户名密码不能为空'})
    return
  }


  console.log('登录中---------')

  AC_Contract.methods.Log_In(AdminAddr,username,password).call(function(err,r){


    console.log('返回中....')
    console.log(r)

    const  is_amdin = r['admin']

    if(r[0] == true){

      let token = expressJwt.sign({username:username},'infonet',{
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

      return res.status(400).json(response)

    }

  })









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
