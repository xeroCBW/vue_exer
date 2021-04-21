const chain_tools = require('../util/chain_tools')

// 教育部获取注册列表
adm_registList = (req, res) => {

  console.log("adm_registList...");

  chain_tools.AC_Contract.methods.Get_Register_List().call((err, result) => {

    if (err) return res.json(err)

    let data = {
      registInfo: []
    }

    for (const v of result) {
      let registInfo = {
        schoolName: v['name'],
        schoolAddress: v['addr']
      }
      data['registInfo'].push(registInfo)

    }

    if (data['registInfo'] != null) {
      return res.json({
        'data': data,
        'meta': {
          'msg': '注册申请过列表',
          'status': 200
        }
      })
    } else {
      return res.json({
        'data': null,
        'meta': {
          'msg': '注册申请列表为空',
          'status': 404
        }
      })
    }
  })
}


// 教育部通过申请(授予权限)

adm_pass = (req, res) => {


  chain_tools.web3.eth.personal.unlockAccount(chain_tools.AdminAddr, chain_tools.AdminPassword, () => {
    chain_tools.AC_Contract.methods.Register(req.query.regist_addr).send({ from: chain_tools.AdminAddr })
        .then(async function (myContactInstance) {
          // console.log("Add successfully.")
              return res.json({
                'data': null,
                'meta': {
                  'msg': '成功授予权限',
                  'status': 200
                }
              })
            })
      .catch(err => {
              console.log(err);
              return res.json({
                'data': err.toString(),
                'meta': {
                  'msg': '授予权限失败',
                  'status': 404
                }
              })
            })

        })
  };


// 教育部拒绝申请(删除申请)

adm_refuse =  (req, res) => {

  chain_tools.web3.eth.personal.unlockAccount(chain_tools.AdminAddr, chain_tools.AdminPassword, () => {

    console.log(req.query)

    chain_tools.AC_Contract.methods.Remove_Register(req.query.regist_addr).send({ from: chain_tools.AdminAddr })
      .then(async function (myContactInstance) {
        return res.json({
          'data': null,
          'meta': {
            'msg': '成功删除权限',
            'status': 200
          }
        })
      })
      .catch(err => {
        return res.json({
          'data': null,
          'meta': {
            'msg': '删除权限失败',
            'status': 404
          }
        })
      })


    })
  };

// 教育部获取所有高校信息
  adm_show = (req, res) => {


    console.log('adm_show...')



    chain_tools.AC_Contract.methods.Get_Commitee_Mumbers().call((err, result) => {


      console.log('adm_show start...')

      console.log(err,result)

      if (err) return res.json(err)

      let data = {
        schoolInfo: []
      }

      for (const v of result) {
        let schoolInfo = {
          schoolName: v['name'],
          schoolAddress: v['addr']
        }
        data['schoolInfo'].push(schoolInfo)
      }

      if (data['schoolInfo'] != null) {
        return res.json({
          'data': data,
          'meta': {
            'msg': '查到学校列表',
            'status': 200
          }
        })
      } else {
        return res.json({
          'data': null,
          'meta': {
            'msg': '学校列表为空',
            'status': 404
          }
        })
      }

    })
  };

// 教育部删除高校
adm_delete = (req, res) => {

  var schoolAddress = req.query.schoolAddress;

  chain_tools.web3.eth.personal.unlockAccount(chain_tools.AdminAddr, chain_tools.AdminPassword, function () {
    chain_tools.AC_Contract.methods.Remove_Committee_Mumber(schoolAddress).send({ from: chain_tools.AdminAddr })
      .then(async function (myContactInstance) {
        return res.json({
          'data': null,
          'meta': {
            'msg': '学校删除成功',
            'status': 0
          }
        })
      })
      .catch(err => {
        return res.json({
          'data': null,
          'meta': {
            'msg': '没找到该学校',
            'status': 1
          }
        })
      })
  })
}



  module.exports ={

    adm_registList,
    adm_pass,
    adm_refuse,
    adm_show,
    adm_delete
  }



