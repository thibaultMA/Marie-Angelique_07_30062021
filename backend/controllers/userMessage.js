const {Message } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.getall=(req, res) => {
    Message.findAll({where:{userid:req.params.id}})
    .then(data=>res.send(data))
} 
exports.getallLike=(req, res) => {
    Message.findAll({where:{userLike:{[Op.like]:`[%${req.params.id}%]`}}})
    .then(data=>res.send(data))
} 
exports.getallDisLike=(req, res) => {
    Message.findAll({where:{userDisLike:{[Op.like]:`[%${req.params.id}%]`}}})
    .then(data=>res.send(data))
} 
 