const express = require('express');
const router = express.Router();

const userAdmin = require('../controllers/user');

router.get('/', userAdmin.getAll )
//cree un user
router.post('/addpost',userAdmin.addpost)
//get one 
router.get('/:id',userAdmin.getOneid)
router.get('/email/:email',userAdmin.getOneEmail)
// update
router.put('/update/:id',userAdmin.updateOne)
//delete
router.delete('/delete/:id',userAdmin.deleteOne)

//**************************************************

//login
router.post('/auth',userAdmin.login)

module.exports = router;