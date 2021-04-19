var express = require('express');
var router = express.Router();

const article = require("../controller/ArticleController")

router.get("/",function (req,res) {

  res.send("welcome to express")
})

/* GET home page. */

router.get('/article/get', article.get_article);
//这个id 会覆盖 get  建议配置 id  都放在后面
router.get('/article/:id', article.id_article);

module.exports = router;
