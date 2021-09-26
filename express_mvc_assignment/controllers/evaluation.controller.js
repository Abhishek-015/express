const express=require("express");
const Evaluation=require("../models/evaluation.model")

const crudController=require("./crud.Controller")
const router=express.Router();

router.post("",crudController.post(Evaluation))

// router.get("",crudController.get(Evaluation))

router.get("/:id",crudController.getOne(Evaluation))

router.patch("/:id",crudController.patch(Evaluation))

router.delete("/:id",crudController.deleteOne(Evaluation))


router.get("",async(req,res)=>{
   const evaluation=await Evaluation.find().populate("instructor").lean().exec();
   return res.status(200).send({evaluation})
})


module.exports=router
