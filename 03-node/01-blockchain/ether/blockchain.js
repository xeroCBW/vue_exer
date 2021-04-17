//author:Wentao Yang
//依赖库引入
var Web3 = require("/usr/local/lib/node_modules/web3")  //web3 
var fs = require("fs")                      //文件读取库                                   
var web3 = new Web3(Web3.givenProvider || 'http://192.168.10.64:8545') //连接私链
//const部分
const ContractAddr = "0x7f06e66c8c0fc913f835bb74e3a793992c14afa9"  //合约地址
const AdminAddr = "0x7ec295a5fab4cb2daa39a958d11e3abd3ee15bba" //账户地址
const ABIAdrr = "./contract.json"  //合约的ABI地址
//连接智能合约
var F = fs.readFileSync(ABIAdrr);
var abi = JSON.parse(F)
var AC_Contract = new web3.eth.Contract(abi, ContractAddr)
//函数定义
function Is_Certified(AC,p_id) {   //证书核验,所有人均有此权限
	AC_Contract.methods.Is_Certified_ID(AC,p_id).call(function(err,r){
		console.log(r)

	})//因为只是读取数据，不更改区块链，使用call()方法
}

function Add_Committee_Mumber(addr, pass, data,name) { //添加委员，注意：只有主席有此权限
	web3.eth.personal.unlockAccount(addr, pass, function () { //解锁账户，并在解锁之后，执行下面的函数
		AC_Contract.methods.Add_Committee_Mumber(data).send({ from: addr }) //因为是修改数据，使用send()方法
			.on('transactionHash', function (transactionHash) {
				console.log("Add committe mumber transaction hash: ", transactionHash)
			})
			.on('receipt', function (receipt) {
				console.log("Have been receipted: ", receipt)
			})
			.then(async function (myContactInstance) {
				console.log("Add successfully.")
			})
			.catch(err => {
				console.log("Error: failed to Add, detail:", err)
			})
	})
}

function Remove_Committee_Mumber(addr, pass, data) { //删除委员，注意：只有主席有此权限
	web3.eth.personal.unlockAccount(addr, pass, function () {
		AC_Contract.methods.Remove_Committee_Mumber(data).send({ from: addr })
			.on('transactionHash', function (transactionHash) {
				console.log("Remove committe mumber transaction hash: ", transactionHash)
			})
			.on('receipt', function (receipt) {
				console.log("Have been receipted: ", receipt)
			})
			.then(async function (myContactInstance) {
				console.log("Remove successfully.")
			})
			.catch(err => {
				console.log("Error: failed to Remove, detail:", err)
			})
	})
}


function Add_AC_Data(addr, pass, AC,P_ID, Admission_Time,Graduation_Time,Gender,AC_Type,major) { //添加数据，注意：只有委员有此权限
	web3.eth.personal.unlockAccount(addr, pass, function () {
		AC_Contract.methods.Add_AC_Data(AC,P_ID, Admission_Time,Graduation_Time,Gender,AC_Type,major).send({ from: addr })
			.on('transactionHash', function (transactionHash) {
				console.log("Add data transaction hash: ", transactionHash)
			})
			.on('receipt', function (receipt) {
				console.log("Have been receipted: ", receipt)
			})
			.then(async function (myContactInstance) {
				console.log("Add successfully.")
			})
			.catch(err => {
				console.log("Error: failed to Add, detail:", err)
			})
	})
}


function Remove_AC_Data(addr, pass, data) { //删除数据，注意：只有委员有此权限
	web3.eth.personal.unlockAccount(addr, pass, function () {
		AC_Contract.methods.Remove_AC_Data(data).send({ from: addr })
			.on('transactionHash', function (transactionHash) {
				console.log("Remove data transaction hash: ", transactionHash)
			})
			.on('receipt', function (receipt) {
				console.log("Have been receipted: ", receipt)
			})
			.then(async function (myContactInstance) {
				console.log("Remove successfully.")
			})
			.catch(err => {
				console.log("Error: failed to Remove, detail:", err)
			})
	})
}

function Search_With_ID(p_id){
	AC_Contract.methods.Search_With_ID(p_id).call(function(err,r){
		console.log(r)
	})//因为只是读取数据，不更改区块链，使用call()方法
}

Add_AC_Data(AdminAddr, "123qwe", "123")
//Remove_AC_Data("0x795d43ee48cb5d9f53762705cb3bb1a1eaa6a8b9","123qwe","123")
//Add_Committee_Mumber("0x795d43ee48cb5d9f53762705cb3bb1a1eaa6a8b9","123qwe","0x9c7d7167a4cf2182dd61d2fd7b9bab44eb191575")
//Add_AC_Data("0x9c7d7167a4cf2182dd61d2fd7b9bab44eb191575","123qwe","123")
//Is_Certified("0x9c7d7167a4cf2182dd61d2fd7b9bab44eb191575","123qwe","123")

