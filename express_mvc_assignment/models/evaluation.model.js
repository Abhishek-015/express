const mongoose=require("mongoose");

// step 1: create the evaluation schema

const evaluationSchema=new mongoose.Schema({
    date_of_evaluation:{type:String,required:true},
    instructor:[{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}],
    topicid:{type:mongoose.Schema.Types.ObjectId,ref:"topic",required:true}

},{
    versionKey:false,
    timestamps:true
})

// step 2: connect the evaluation schema to the evaluation collection

const Evaluation=mongoose.model("evaluation",evaluationSchema);

module.exports=Evaluation