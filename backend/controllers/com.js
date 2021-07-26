const db =require('../db/DB') 

exports.getALL=(req,res,next)=>{
    let sql = `SELECT * FROM commentaires WHERE messageid = '${req.params.messageid}'`;
    let query = db.query(sql,(err,result)=>{
        
        if(err) throw err
        res.send(result).status(201)
            //revoi un tableau [] et on peut for dessus // .length
       
    })
}
exports.getOne=(req, res, next)=>{
    let sql= `SELECT * FROM commentaires WHERE id = "${req.params.id}"`
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
         res.send(result)
    })
}
exports.postCom=(req,res,next)=>{
    let sql = "INSERT INTO `commentaires` SET ?"
    let message = {
        userid:req.body.userid,
        content:req.body.content,
        messageid:req.body.messageid
    }
    let query = db.query(sql,message,(err,result)=>{
        if(err) throw err;
        res.status(201).json(result)
    })
}
exports.putLike=(req, res, next)=>{
    let change = req.body

    let sql=`UPDATE commentaires SET nbrLike='${(change.nbrLike)}',  nbrDisLike = '${change.nbrDisLike}', userLike = '${JSON.stringify(change.userLike)}', userDisLike = '${JSON.stringify(change.userDisLike)}' WHERE id = ${req.params.comid}`

    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
         res.send('result')
    })
}
exports.dellALLuser = (req, res, next) => {
    let sql = `DELETE FROM commentaires WHERE userid =${req.body.userID}`
    db.query(sql,(err,result)=>{
      if (err) throw err;
      res.send(result)
    })
  }