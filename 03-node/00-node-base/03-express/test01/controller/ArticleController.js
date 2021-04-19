var get_article = function (req,res) {
  console.log(req.query)
  res.json({
    data:"get_article"
  })
}


var id_article = function (req,res) {

  console.log(req.query)
  res.json({
    data:"id_article"

  })

}



module.exports ={
  get_article,
  id_article
}