const mysql = require('mysql')



module.exports ={

  config:{
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'exapp'
  },

//  链接数据库,使用mysql
  
  sqlConnet:function (sql,sqlArr,callBack) {

    var pool = mysql.createPool(this.config)
    pool.getConnection((err,conn)=>{
      if(err){
        console.log('链接失败')
        return
      }
    //  事件驱动回调
      conn.query(sql,sqlArr,callBack);
      conn.release();
    })
    
  }

  

}
