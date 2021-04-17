var dbConfig = require('../util/dbconfig')


getPostList=(req,res)=>{

  var sql = 'select * from post'

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

}


module.exports = {

  getPostList

}
