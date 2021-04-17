var express = require('express');
var router = express.Router();

var dbConfig = require('../util/dbconfig')

/* GET home page. */
router.get('/', function(req, res, next) {

  var sql = 'select * from image'

  var sqlArr = []

  var callBack = (err,data)=>{
    if(err){
      console.log('链接出错')
    }else{
      res.send({
        'data':data,
        'meta':{
          status:200,
          msg:'请求成功'
        }
      })
    }
  }

  dbConfig.sqlConnet(sql,sqlArr,callBack)









  // res.render('index', { title: 'Express' });
});

module.exports = router;
