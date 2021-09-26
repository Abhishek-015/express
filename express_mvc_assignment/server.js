const express=require("express");


const connect=require("./config/db")


const userController=require("./controllers/user.controller")
const topicController=require("./controllers/topic.controller")
const evaluationController=require("./controllers/evaluation.controller")
const studentController=require("./controllers/student.controller")


const app=express();
app.use(express.json())
app.use("/user",userController)
app.use("/student",studentController)
app.use("/evaluation",evaluationController)
app.use("/topic",topicController)

app.listen("3001", async function(){
    await connect();
    console.log("Listening at port 3001");
})