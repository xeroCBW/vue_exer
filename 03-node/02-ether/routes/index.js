var express = require('express');
var router = express.Router();

//导入文件

var cate = require('../controllers/CateController')

var post = require('../controllers/PostController')



/* GET home page. */
router.get('/',cate.getCateList)
router.get('/post',post.getPostList)
module.exports = router;
