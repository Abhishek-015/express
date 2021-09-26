const mongoose=require("mongoose");

// step 1: create the user schema
const userSchema=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    gender:{type:String,required:false},
    dob:{type:String,required:true}
 })
 // step 2: connect the user schema to the user collection
  const User =mongoose.model("user",userSchema); 

  module.exports=User