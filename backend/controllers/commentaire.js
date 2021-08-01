const {Commentaire} = require('../models')

exports.getall = (req, res, next) => {
    Commentaire.findAll({where:{messageid:req.params.id}})
    .then(data=>res.send(data))
}
exports.postOne = (req, res, next) => {
    console.log(req.body);
    let newCom = Commentaire.create({
        userid:req.body.userid,
        content:req.body.content,
        messageid:req.body.messageid
    })
    .then(()=>res.send(newCom))
}
exports.like=(req,res)=>{
    let newnbrLike=req.body.nbrLike
    let newnbrDisLike=req.body.nbrDisLike
    let newuserLike=req.body.userLike
    let newuserDisLike=req.body.userDisLike
    Commentaire.findOne({
        where:{id:req.params.id}
    })
    .then(CommentaireFound=>{
        if (CommentaireFound) {
            CommentaireFound.update({
                nbrLike:newnbrLike,
                nbrDisLike:newnbrDisLike,
                userLike:newuserLike,
                userDisLike:newuserDisLike,
            })
        }
    })
}
exports.delete=(req,res)=>{
    Commentaire.findOne({
        where:{id:req.params.id}
    })
    .then(CommentaireFound=>{
        if (CommentaireFound) {
            CommentaireFound.destroy()
            res.send("ok")
        }
    })
}