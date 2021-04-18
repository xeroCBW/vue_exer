const chain_tools = require('../util/chain_tools')


// 模糊查询
certification_query =(req, res) => {

  // 区块链查询过程
  chain_tools.AC_Contract.methods.Search_With_ID(req.body.idNum).call(function (err, r) {

    let level = {
      '0': '学士',
      '1': '硕士',
      '2': '博士'
    }

    let data = {
      graduateInfo: []
    }

    for (const v of r) {
      if (v['Sign'] === true) {
        let graduateInfo = {
          schoolName: v['School'],
          graduateTime: v['Admission_Time'] + '-' + v['Graduation_Time'],
          major: v['major'],
          degree: level[v['AC_Type']],
        }
        data['graduateInfo'].push(graduateInfo)
      }
    }

    if (data['graduateInfo'] = null) {
      return res.json({
        'data': data,
        'meta': {
          'msg': '证书已查到',
          'status': 200
        }
      })
    } else {
      return res.json({
        'data': null,
        'meta': {
          'msg': '没有查到证书',
          'status': 404
        }
      })
    }
  })
}




// 精确查询
certification_queryDetail = (req, res) => {
  // cerNum idNum : 证书编号 身份证号
  let { cerNum, idNum } = req.body

  chain_tools.AC_Contract.methods.Is_Certified_ID(cerNum, idNum).call(function (err, r) {
    // console.log(r)
    if (r['Sign'] == true) {
      let level = {
        '0': '学士',
        '1': '硕士',
        '2': '博士'
      }
      let data = {
        graduateInfo: [
          {
            schoolName: r['School'],
            graduateTime: r['Admission_Time'] + '-' + r['Graduation_Time'],
            major: r['major'],
            degree: level[r['AC_Type']],
          }
        ]
      }
      return res.json({
        'data': data,
        'meta': {
          'msg': '证书已查到',
          'status': 200
        }
      })
    }
    if (r['Sign'] == false) {
      return res.json({
        'data': null,
        'meta': {
          'msg': '证书不存在',
          'status': 404
        }
      })

    }
  })
}



module.exports={
  certification_query,
  certification_queryDetail
}
