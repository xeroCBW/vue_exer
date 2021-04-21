var express = require('express');
var router = express.Router();

//导入文件
var user = require('../controllers/UserController')
var cert = require('../controllers/CertificateChain')
var adm = require('../controllers/AdminController')
var manager = require('../controllers/ManagerController')
var certification = require('../controllers/CertificationController')

//高校用户模块
router.post('/login',user.login)//登录
router.post('/register',user.register)//注册


//设置 adm模块
router.get('/admin/registList',adm.adm_registList)//教育部获取注册列表
router.get('/admin/pass',adm.adm_pass)//教育部通过申请(授予权限)
router.get('/admin/refuse',adm.adm_refuse)//教育部拒绝申请(删除申请)
router.get('/admin/show',adm.adm_show)// 教育部获取所有高校信息
router.get('/admin/delete',adm.adm_delete)// 教育部删除高校


//设置 manager模块
router.post('/manager/upload',manager.manager_upload)// 上传证书功能
router.post('/manager/delete',manager.manager_delete)// 删除证书功能

//证书模块
router.post('/certification/query',certification.certification_query) //模糊查询
router.post('/certification/queryDetail',certification.certification_queryDetail) //精确查询


module.exports = router;
