const express=require("express");
const router = express.Router()
const {showPostWithId,createPost,deletePost,editPost,showSinglePost} =require("../controllers/note")

const {auth}=require("../middlewares/authMiddle")


// post route

router.post('/createPost',auth,createPost)
router.post('/deletePost',auth,deletePost)
router.post('/showPost',auth,showPostWithId)
router.post('/editPost',auth,editPost)
router.post('/showSinglePost',auth,showSinglePost)

module.exports = router