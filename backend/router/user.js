const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");


const auth =require('../middleware/auth')
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //  minutes * s * ms
    max: 250, // limit each IP to 100 requests per windowMs
    message:'vous avez atteint la limite de demande server'
});

const userCTRL = require('../controllers/user');

router.get('/:id'       ,limiter,userCTRL.getOneid)
router.post('/addpost'  ,userCTRL.addOne)
router.post('/auth'     ,userCTRL.login)
router.post('/test'     ,limiter,auth.test,userCTRL.test)
router.put('/:id/update',limiter,auth.test,userCTRL.update)

router.delete("/:id/delete",limiter,auth.test,userCTRL.delete)






module.exports = router;