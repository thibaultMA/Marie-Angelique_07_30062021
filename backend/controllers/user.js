const {Users ,Message, Commentaire} = require('../models')
const jwtUtils = require("../middleware/auth");
const bcrypt = require("bcrypt");

exports.getOneid = (req, res, next) => {
    Users.findOne({where:{id:req.params.id}})
    .then(user=>{
        res.send(user.dataValues)
    })
    .catch(err=>console.log(err))
}
exports.addOne = (req, res, next) => {
    let user = req.body
    console.log(user);
    bcrypt.hash(user.password,10)
    .then(hash=>{
        Users.create({
            name:user.name,
            email:user.email,
            password:hash,
        })
        .then((newUser)=>res.json({ok:true}))
        .catch(err=>res.json({ok:false}))
    })
}

exports.login = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
     
    Users.findOne({where:{email:email}})
    .then(userFound=>{
        if (userFound) {
            bcrypt.compare(password, userFound.password)
            .then(result=>{
                
                if (result) {
                    let u  = {
                        ...userFound.dataValues,
                        "token":jwtUtils.generateToken(userFound)
                    }
                    return res.status(200).send(u)
                 
                }else console.log("BCRYPT ERR : ",erBcrypt);
            })
        

        }else return res.status(404).json({'error':'Utilisateur non trouvé !'})
    })
    .catch(err=>res.status(500).send(err))
}
exports.test = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
     
    Users.findOne({where:{email:email}})
    .then(userFound=>{
        if (userFound) {
            bcrypt.compare(password, userFound.password)
            .then(result=>{
                
                if (result) {
                    let u  = {
                        ...userFound.dataValues,
                        "token":jwtUtils.generateToken(userFound)
                    }
                    return res.send(u)
                 
                }else console.log("BCRYPT ERR : ",erBcrypt);
            })
        

        }else return res.status(404).json({'error':'Utilisateur non trouvé !'})
    })
    .catch(err=>res.status(500).send(err))
} 
exports.update=(req,res)=>{
    console.log(req.body.userID);
   Users.findOne({where:{id:req.params.id}})
    .then(userFound=>{
        if (userFound.id == req.body.userID) {
            userFound.update({
                name:req.body.userName
            })
            .then(data=>{
                console.log(data);
                res.send(data)
            })
        }
        else{res.status(400).send(new Error('fail'))}
    }).catch(err=>console.log(5415,err))
    
}
exports.delete=(req,res)=>{
    console.log(req.body.id);
    Users.findOne({
        where:{
            id:req.params.id
        }
    })
    .then(userFound=>{
        if (userFound.id == req.body.id) {
           Commentaire.destroy({where:{userid:req.body.id}})
           .then(response=>{
                Message.destroy({where:{userid :req.body.id }})
                .then(response=>{
                    Users.destroy({where:{id : req.body.id }})
                    .then(response=>{
                        console.log(response);
                        res.send("ok")
                    })
                    .catch(err=>console.log("user err ",err))
                })
                .catch(err=>console.log("message err",err))
           })
           .catch(err=>console.log("com err",err))
        }
        else res.send("user not found")
    })
    .catch(err=>console.log(err))
}