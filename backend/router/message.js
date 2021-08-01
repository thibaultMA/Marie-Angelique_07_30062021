const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth')

const messageCTRL = require('../controllers/messages');
const commentaireCTRL = require('../controllers/commentaire');
const userMessage = require('../controllers/userMessage');

//message
router.get('/',messageCTRL.getall)
router.post('/post',auth.test,messageCTRL.addOne)
router.put('/:id/like',auth.test,messageCTRL.like)
router.delete('/:id/delete',auth.test,messageCTRL.delete)

// commentaires
router.get('/:id/com',commentaireCTRL.getall)
router.post('/:id/postCOM',auth.test,commentaireCTRL.postOne)
router.put('/:id/comLike',auth.test,commentaireCTRL.like)
router.delete('/com/:id/delete',auth.test,commentaireCTRL.delete)


//user message
router.get('/user/:id',auth.test,userMessage.getall)
router.get('/user/:id/like',auth.test,userMessage.getallLike)
router.get('/user/:id/Dislike',auth.test,userMessage.getallDisLike)






module.exports = router;