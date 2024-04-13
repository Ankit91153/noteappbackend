const express=require("express");
const router = express.Router()
const {userSignup,login} =require("../controllers/auth")

const {auth}=require("../middlewares/authMiddle")

router.post('/signup',userSignup);
router.post('/login',login);



module.exports = router