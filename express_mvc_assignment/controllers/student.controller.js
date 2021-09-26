const express=require("express");
const Student=require("../models/student.model")

const crudController=require("./crud.Controller")
const router=express.Router();



//-------------------CRUD api for tags-----------------

router.post("",crudController.post(Student))

// router.get("",crudController.get(Student))

router.get("/:id",crudController.getOne(Student))

router.patch("/:id",crudController.patch(Student))

router.delete("/:id",crudController.deleteOne(Student))


router.get("",async(req,res)=>{
   const student=await Student.find().sort({marks:-1}).limit(1).populate("userid").lean().exec();
   return res.status(200).send({student})
})

module.exports=router