const {Users,Message ,Commentaire} = require('../models')

exports.getall=(req, res) => {
    Message.findAll()
    .then(data=>res.send(data))
}
exports.addOne=(req,res)=>{
    let newMessage = Message.create({
        userid:req.body.userid,
        content:req.body.content
    })
    .then(()=>res.send(newMessage))
}
exports.like=(req,res)=>{
    let nbrLike=req.body.nbrLike
    let nbrDisLike=req.body.nbrDisLike
    let userLike=req.body.userLike
    let userDisLike=req.body.userDisLike
    Message.findOne({
        where:{id:req.params.id}
    })
    .then(messageFound=>{
        if (messageFound) {
            messageFound.update({
                nbrLike:nbrLike,
                nbrDisLike:nbrDisLike,
                userLike:userLike,
                userDisLike:userDisLike,
            })
            .then(()=>res.send("ok"))
        }
    })
}
exports.delete=(req,res)=>{
    Users.findOne({
        where:{
            id:req.body.id
        },
    })
    .then(userFound=>{
        if (userFound.id == req.body.id && userFound.niveau == 1 &&req.body.niveau == 1) {
            Commentaire.destroy({
            where:{
                messageid:req.params.id
            },
            })
            .then(()=>{
                Message.destroy({
                    where:{
                        id:req.params.id
                    },
        
                })
                .then(()=>res.send("ok"))
            })
        }
        else{throw 'vous n\' avez pas les droits'}
    })
    .catch(err=>res.status(401).json({err}))
    
    
    
}