
const config = require("./config/config")

var Web3 = require("web3")  //web3
var fs = require("fs")                      //文件读取库
var web3 = new Web3(Web3.givenProvider || config.chain_addr) //连接私链
//const部分
const ContractAddr = config.ContractAddr  //合约地址
const AdminAddr = config.AdminAddr //账户地址
const ABIAdrr = "./contract.json"  //合约的ABI地址
//连接智能合约
var F = fs.readFileSync(ABIAdrr);
var abi = JSON.parse(F)
var AC_Contract = new web3.eth.Contract(abi, ContractAddr)


AC_Contract.methods.Log_In(AdminAddr,"admin","admin").call(function(err,r){

  console.log(r)

})
