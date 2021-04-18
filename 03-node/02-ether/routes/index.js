var express = require('express');
var router = express.Router();
//导入jwt
const jwt = require('jsonwebtoken')

//导入文件
var image = require('../controllers/ImageController')
var post = require('../controllers/PostController')
var user = require('../controllers/UserController')
var cert = require('../controllers/CertificateChain')
var adm = require('../controllers/AdminController')
var manager = require('../controllers/ManagerController')
var certification = require('../controllers/CertificationController')

/* GET home page. */
router.get('/image',image.getImageList)
router.get('/post',post.getPostList)


// router.post('/certochain',cert.certifate_chain)

//高校用户模块
router.post('/login',user.login)
router.post('/register',user.register)


//设置 adm模块
router.post('/admin/registList',adm.adm_registList)
router.get('/admin/pass',adm.adm_pass)
router.get('/admin/refuse',adm.adm_refuse)
router.get('/admin/show',adm.adm_show)
router.get('/admin/delete',adm.adm_delete)


//设置 manager模块
router.post('/manager/upload',manager.manager_upload)
router.post('/manager/delete',manager.manager_delete)

//证书模块
router.post('/certification/query',certification.certification_query) //模糊查询
router.post('/certification/queryDetail',certification.certification_queryDetail) //精确查询


module.exports = router;
