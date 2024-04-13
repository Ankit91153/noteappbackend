const User = require("../models/user");
const Notes = require("../models/notes");

exports.createPost = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      res.send({
        success: false,
        message: "All fields are required",
        status: 400,
      });
    }

    const createNote = await Notes.create({ title, description, userId });

    if (createNote) {
      res.send({
        success: true,
        message: "Notes created successfully",
        data: createNote,
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Somthing went wrong when create a post",
      status: 400,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.send({
        success: false,
        message: "All fields are required",
        status: 400,
      });
    }

    const deletePost = await Notes.findByIdAndDelete({ _id: id });
    if (deletePost) {
      res.send({
        success: true,
        message: "Notes Deleted successfully",
        data: deletePost,
        status: 200,
      });
    }else{
        res.send({
            success: true,
            message: "Notes Not present",
            status: 400,
          });
    }
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Something went wrong delete the post",
      status: 400,
    });
  }
};

exports.showPostWithId = async (req, res) => {

    try{
        const { id } = req.user;
        if (!id) {
          res.send({
            success: false,
            message: "All fields are required",
            status: 400,
          });
        }
      
        const allPost=await Notes.find({userId:id});
      console.log(allPost);
        console.log(allPost.length);
      
        if(allPost.length<=0){
          res.send({
              success: true,
              message: "Not Create any Post",
              status: 200,
            });
        }
      
        if(allPost.length>0){
          res.send({
              success: true,
              message: "All Post Of user",
              status: 200,
              data:allPost
            });
        }
    }
    catch(err){
        console.log(err);
        res.send({
            success: false,
            message: "something went wrong when show post",
            status: 400,
          });
    }
  
};

exports.editPost=async(req,res)=>{
  try{
    const {id}=req.body;
    const{title,description}=req.body;
    if(!id){
      res.send({
        success: false,
        message: "All fields are required",
        status: 400,
      });
    }

    const updateData=await Notes.findByIdAndUpdate({_id:id},  { title, description }, { new: true });
    console.log(updateData);
    if(updateData){
      res.send({
        status:200,
        success:true,
        data:updateData
      })
    }
  }
  catch(err){
    console.log(err);
    res.send({
        success: false,
        message: "something went wrong when show post",
        status: 400,
      });
  }
}

exports.showSinglePost=async(req,res)=>{
  try{

    const {id}=req.body;

    const data=await Notes.findOne({_id:id});
    console.log(data);
    res.send({
      success:true,
      status:200,
      data:data
    })
  }catch(err){
    res.send({
      success: false,
      message: "something went wrong when show post",
      status: 400,
    });
  }
}
