const chain_tools = require('../util/chain_tools')

// 上传证书功能
manager_upload = (req, res) => {
  let { admissionTime, cerNum, graduateTime, idNum, level, major } = req.body

  console.log(admissionTime, cerNum, graduateTime, idNum, level, major)
  console.log(chain_tools.AdminAddr, chain_tools.AdminPassword)
  

  // console.log(req.body)
  chain_tools.web3.eth.personal.unlockAccount(chain_tools.AdminAddr, chain_tools.AdminPassword, function () { //解锁账户，并在解锁之后，执行下面的函数
    chain_tools.AC_Contract.methods.Add_AC_Data(cerNum, idNum, admissionTime, graduateTime, level, major).send({ from: chain_tools.AdminAddr })
      .then(async function (myContactInstance) {
        console.log("Add successfully.")
        return res.json({
          'data': null,
          'meta': {
            'msg': '上链成功',
            'status': 0
          }
        })
      })
      .catch(err => {
        console.log("Error: failed to Add, detail:", err)
        return res.json({
          'data': null,
          'meta': {
            'msg': '证书已存在',
            'status': 1
          }
        })
      })
  })
}



// 删除证书功能
manager_delete = (req, res) => {

  var cerNum = req.body.cerNum

  chain_tools.web3.eth.personal.unlockAccount(chain_tools.AdminAddr, '123qwe', function () {
    chain_tools.AC_Contract.methods.Remove_AC_Data(cerNum).send({from: chain_tools.AdminAddr})
      .then(async function (myContactInstance) {
        console.log("Remove successfully.")
        return res.json(
          {
            'data': null,
            'meta': {
              'msg': '证书删除成功',
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
            msg: '证书不存在，删除失败',
            'status': 1
          }
        })
      })
  })
}




module.exports={

  manager_upload,
  manager_delete

}