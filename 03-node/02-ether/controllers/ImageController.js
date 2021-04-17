var dbConfig = require('../util/dbconfig')


getImageList=(req,res)=>{


  let {id} = req.query
  var sql = 'select * from image where  user_id = ?'

  var sqlArr = [id]

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

  getImageList

}