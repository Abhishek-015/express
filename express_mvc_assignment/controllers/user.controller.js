const express = require("express");
const User=require("../models/user.model")

const crudController=require("./crud.Controller")
const router=express.Router();


router.post("",crudController.post(User))

router.get("",crudController.get(User))

router.get("/:id",crudController.getOne(User))

router.delete("/:id",crudController.deleteOne(User))

router.patch("/:id",crudController.patch(User))

// router.get("/:id/posts",async(req,res)=>{
//    const posts=await Post.find({author:req.params.id}).lean().exec();
//    const author=await User.findById(req.params.id).lean().exec();
//    return res.status(200).send({posts,author})
// })

module.exports=router