const mongoose=require("mongoose");

// step 1: create the students schema

const studentSchema=mongoose.Schema({
    currentbatch:{type:String,required:true},
    rollid:{type:Number,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    marks:{type:Number,required:false}

    
},{
versionKey:false,
timestamps:true
})
// step 2: connect the students schema to the students collection
const Student=mongoose.model("student",studentSchema);

module.exports=Student