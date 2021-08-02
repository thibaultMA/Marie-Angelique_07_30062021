const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth')

const messageCTRL = require('../controllers/messages');
const commentaireCTRL = require('../controllers/commentaire');
const userMessage = require('../controllers/userMessage');

const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //  minutes * s * ms
    max: 250, // limit each IP to 100 requests per windowMs
    message:'vous avez atteint la limite de demande server'
});


//message
router.get('/'              ,limiter,auth.test,messageCTRL.getall)
router.post('/post'         ,limiter,auth.test,messageCTRL.addOne)
router.put('/:id/like'      ,limiter,auth.test,messageCTRL.like)
router.delete('/:id/delete' ,limiter,auth.test,messageCTRL.delete)

// commentaires
router.get('/:id/com'           ,limiter,auth.test,commentaireCTRL.getall)
router.post('/:id/postCOM'      ,limiter,auth.test,commentaireCTRL.postOne)
router.put('/:id/comLike'       ,limiter,auth.test,commentaireCTRL.like)
router.delete('/com/:id/delete' ,limiter,auth.test,commentaireCTRL.delete)


//user message
router.get('/user/:id'          ,limiter,auth.test,userMessage.getall)
router.get('/user/:id/like'     ,limiter,auth.test,userMessage.getallLike)
router.get('/user/:id/Dislike'  ,limiter,auth.test,userMessage.getallDisLike)
limiter,





module.exports = router;