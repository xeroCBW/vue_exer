var express = require('express');
var router = express.Router();

//导入文件

var image = require('../controllers/ImageController')

var post = require('../controllers/PostController')



/* GET home page. */
router.get('/image',image.getImageList)
router.get('/post',post.getPostList)
module.exports = router;
