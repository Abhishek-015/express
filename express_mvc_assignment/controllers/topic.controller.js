const express=require("express");
const Topic=require("../models/topic.model")

const crudController=require("./crud.Controller")
const router=express.Router();


router.post("",crudController.post(Topic))

router.get("",crudController.get(Topic))

router.get("/:id",crudController.getOne(Topic))

router.delete("/:id",crudController.deleteOne(Topic))

router.patch("/:id",crudController.patch(Topic))


// router.get("", async(req,res)=>{
//     const topic=await Topic.find().populate({path:'author',select:'first_name'}).populate("tags").lean().exec();
//     return res.status(200).send({topic})
// })

// get all students for the post

// router.get("/:id/student",async (req,res)=>{
//     const student=await Student.find({topic:req.params.id}).lean().exec();
//     const topic=await Topic.findById(req.params.id).lean().exec()
//     return res.status(200).send({student,topic})
// })

module.exports=router