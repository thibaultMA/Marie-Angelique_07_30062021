const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth')
const userCTRL = require('../controllers/user');

router.get('/:id',userCTRL.getOneid)
router.post('/addpost',userCTRL.addOne)
router.post('/auth',userCTRL.login)
router.post('/test',userCTRL.test)
router.put('/:id/update',auth.test,userCTRL.update)

router.delete("/:id/delete",auth.test,userCTRL.delete)






module.exports = router;