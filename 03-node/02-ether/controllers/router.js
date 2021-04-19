var express = require('express')
var Web3 = require("web3")  //web3 
var fs = require("fs")                      //文件读取库                                   
const { sign } = require('crypto')
const { json } = require('express')
const { rootCertificates } = require('tls')
var web3 = new Web3(Web3.givenProvider || 'http://192.168.10.92:8545') //连接私链
//const部分
const ContractAddr = "0xc96f8d810469e401d93562c9a101cfd4dcd30d34"  //合约地址
const AdminAddr = "0x5143c835634c00efe4f2b828071ac7470a3dc4ce" //账户地址
const ABIAdrr = "./contract.json"  //合约的ABI地址
//连接智能合约
var F = fs.readFileSync(ABIAdrr);
var abi = JSON.parse(F)
var AC_Contract = new web3.eth.Contract(abi, ContractAddr)

// 创建一个路由容器
var router = express.Router()

// 将路由挂载到 router 容器中

router.get('/', (req, res) => {
    res.render('index.html')
})

router.get('/admin', (req, res) => {
    res.render('admin.html')
})

router.get('/manager', (req, res) => {
    res.render('manager.html')
})

// 登录处理操作
router.post('/login', (req, res) => {
    // usrname password: 用户名 密码
    let { username, password } = req.body

    // 区块链查询过程


    // 区块链查询返回结果

    // 0 表示用户名和密码正确
    // 1 表示用户名或者密码错误
    // 2 表示用户不存在
    if (result === 0) {
        // 验证正确，设置 Session
        return res.status(200).json({
            'data': null,
            'meta': {
                'msg': '登录成功',
                'status': 200
            }
        })

    } else if (result === 1) {
        return res.status(200).json({
            'data': null,
            'meta': {
                'msg': '用户名或密码错误',
                'status': 403
            }
        })
    } else {
        return res.json({
            // return res.sendResult({
            'data': null,
            'meta': {
                'msg': '用户不存在',
                'status': 404
            }
        })
    }
})

// 注册高校
router.post('/register', (req, res) => {
    let { school_name, usernname, password } = req.body
    web3.eth.personal.unlockAccount(AdminAddr, '123qwe', function () {
        AC_Contract.methods.Application_Regist(school_name, usernname, password).send({ from: AdminAddr })
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
})


// 模糊查询
router.post('/query', (req, res) => {

    // 区块链查询过程
    AC_Contract.methods.Search_With_ID(req.body.idNum).call(function (err, r) {

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
})

// 精确查询
router.post('/queryDetail', (req, res) => {
    // cerNum idNum : 证书编号 身份证号
    let { cerNum, idNum } = req.body

    AC_Contract.methods.Is_Certified_ID(cerNum, idNum).call(function (err, r) {
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
})

// 上传证书功能
router.post('/manager/upload', (req, res) => {
    let { admissionTime, cerNum, graduateTime, idNum, level, major, name, schoolName } = req.body

    // console.log(req.body)
    web3.eth.personal.unlockAccount(AdminAddr, "123qwe", function () { //解锁账户，并在解锁之后，执行下面的函数
        AC_Contract.methods.Add_AC_Data(cerNum, idNum, admissionTime, graduateTime, level, major).send({ from: AdminAddr })
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
})

// 删除证书功能
router.post('/manager/delete', (req, res) => {
    var cerNum = req.body.cerNum

    web3.eth.personal.unlockAccount(AdminAddr, '123qwe', function () {
        AC_Contract.methods.Remove_AC_Data(cerNum).send({ from: AdminAddr })
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
})

// 教育部获取注册列表
router.post('/admin/registList', (req, res) => {
    AC_Contract.methods.Get_Register_List().call((err, result) => {
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
})

// 教育部通过申请(授予权限)
router.get('/admin/pass', (req, res) => {
    web3.eth.personal.unlockAccount(AdminAddr, '123qwe', () => {
        AC_Contract.methods.Add_AC_Data(req.query.regist_addr).send({ from: AdminAddr })
            .then(async function (myContactInstance) {
                // console.log("Add successfully.")
                AC_Contract.methods.Add_Committee_Mumber(req.query.regist_addr, req.query.regist_name).send({ from: AdminAddr })
                    .then(async function (myContactInstance) {
                        return res.json({
                            'data': null,
                            'meta': {
                                'msg': '成功授予权限',
                                'status': 200
                            }
                        })
                    })
                    .catch(err => {
                        return res.json({
                            'data': null,
                            'meta': {
                                'msg': '授予权限失败',
                                'status': 404
                            }
                        })
                    })

            })
            .catch(err => {
                return res.json({
                    'data': null,
                    'meta': {
                        'msg': '授予权限失败',
                        'status': 404
                    }
                })
            })
    })
})

// 教育部拒绝申请(删除申请)
router.get('/admin/refuse', (req, res) => {
    web3.eth.personal.unlockAccount(AdminAddr, '123qwe', () => {
        AC_Contract.methods.Remove_Committee_List(req.query.regist_addr, req.query.regist_name).send({ from: AdminAddr })
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

})

// 教育部获取所有高校信息
router.post('/admin/show', (req, res) => {
    AC_Contract.methods.Get_Commitee_Mumbers().call((err, result) => {
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
})

// 教育部删除高校
router.get('/admin/delete', (req, res) => {

    var schoolAddress = req.query.schoolAddress

    web3.eth.personal.unlockAccount(AdminAddr, '123qwe', function () {
        AC_Contract.methods.Remove_Committee_Mumber(schoolAddress).send({ from: AdminAddr })
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
})

// 把 router 导出
module.exports = router
