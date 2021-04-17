var express = require('express');
var router = express.Router();
//导入jwt
const jwt = require('jsonwebtoken')

//导入文件
var image = require('../controllers/ImageController')
var post = require('../controllers/PostController')
var user = require('../controllers/UserController')
var cert = require('../controllers/CertificateChain')

/* GET home page. */
router.get('/image',image.getImageList)
router.get('/post',post.getPostList)


//使用post 请求使用post
router.post('/login',user.login)
router.post('/certochain',cert.certifate_chain)



module.exports = router;
