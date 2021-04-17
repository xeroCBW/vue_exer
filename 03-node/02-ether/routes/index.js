var express = require('express');
var router = express.Router();

//导入文件

var cate = require('../controllers/CateController')





/* GET home page. */
router.get('/',cate.getCateList)
module.exports = router;
