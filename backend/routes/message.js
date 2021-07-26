const express = require("express");
const router = express.Router();

const message = require("../controllers/message");
const com = require("../controllers/com");

// message
router.get("/", message.getALL);
router.get("/:id", message.getOne);


router.post("/post", message.postMessage);
router.put("/:messageid/like", message.putLike);
router.delete('/messsage/dell',message.dellALLuser)
// commentaire

router.get("/:messageid/com", com.getALL);
router.delete('/com/dell',com.dellALLuser)

router.post("/:messageid/postCom", com.postCom);
router.put("/:messageid/:comid/like", com.putLike);

// user message
router.get("/user/:user/id/:id", message.getALLuser);
router.get("/user/:user/Dislike", message.getALLuserDisLke);
router.get("/user/:user/like", message.getAllUserLke);
router.get("/:messageid/com/:id", com.getOne);  

module.exports = router;
