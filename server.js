const express=require("express");
const mongoose=require("mongoose");
const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/products")
}

const movieSchema=mongoose.Schema({
     name:{type:String,required:true},
     price:{type:String,required:true},
     size:{type:String,required:false}
})
 const User=mongoose.model("users",movieSchema);
 const app = express();
 app.use(express.json());


 app.post("/output",async (req,res)=>{
     const user=await User.create(req.body)
     return res.status(201).send({user})
 })

 app.get("/output",async (req,res)=>{
     const user=await User.find().lean().exec()
     return res.status(200).send({user})
 })

app.get("/output/:id",async (req,res)=>{
    const user=await User.findById(req.params.id).lean().exec()
    return res.status(200).send({user})
})

app.patch("/output/:id",async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({user})
})

app.delete("/output/:id",async(req,res)=>{
    const user=await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({user});
})

app.listen("3000",async ()=>{
    await connect();
    console.log("listening at port 3000");
})