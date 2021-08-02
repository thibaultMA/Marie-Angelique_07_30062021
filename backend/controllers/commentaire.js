const {Users,Commentaire} = require('../models')

exports.getall = (req, res, next) => {
    console.log(req.params.id);
    Commentaire.findAll({where:{messageid:req.params.id}})
    .then(data=>res.send(data))
    .catch(err=>res.send(err))
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
    console.log(req.body);
    Users.findOne({where:{id:req.body.id}})
    .then(userFound=>{
        if (userFound.niveau ==req.body.niveau&&userFound.niveau == 1&&req.body.niveau == 1) {
            Commentaire.findOne({
                    where:{id:req.params.id}
            })
            .then(CommentaireFound=>{
                if (CommentaireFound) {
                    CommentaireFound.destroy()
                    res.status(201).json({messsage:"ok"})
                }
            })
        }else throw "vous n'avez pas les droits"
    })
    .catch(err=>res.status(400).json({err}))
 
}