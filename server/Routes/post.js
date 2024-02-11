const express = require("express");
const router = express.Router();
const post = require("../Models/post");
const verifyToken = require("../verifyToken");
const comment=require("./comment")

//Create
router.post("/create",verifyToken,async(req,res)=>{
    try{
    const NewPost = new post(req.body)
    const savedPost=await NewPost.save()
    res.status(201).send(savedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//Update
router.put("/:id",verifyToken, async (req, res) => {
  try {
    const updatedPost=await post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete
router.delete("/:id",verifyToken, async (req,res) => {
  try {
    await post.findByIdAndDelete(req.params.id);
    // await comment.deleteMany({PostId:req.params.id})
    res.status(200).json("Post have been deleted")
  } catch (err) {
    res.status(500).send(err)
  }
});

//GET POST DETAILS
router.get("/:id",async (req,res)=>{
  try{
      const Post=await post.findById(req.params.id)
      res.status(200).json(Post)
  }
  catch(err){
      res.status(500).json(err)
  }
})

//Get Post
router.get("/",async (req,res)=>{
  const query=req.query
  
  try{
      const searchFilter={
          title:{$regex:query.search, $options:"i"}
      }
      const posts=await post.find(query.search?searchFilter:null)
      res.status(200).json(posts)
  }
  catch(err){
      res.status(500).json(err)
  }
})

//Get User Post
router.get("/user/:userId", async (req, res) => {
    try {
      const Post= await post.find({userId:req.params.id});
      res.status(200).json(Post)
    } catch (err) {
      res.status(500).send(err)
    }
  });



module.exports = router;

