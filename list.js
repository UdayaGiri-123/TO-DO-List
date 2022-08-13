const express = require("express");
const date = require(__dirname+"/date.js");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const mongoose= require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

const TaskSchema=new mongoose.Schema({
    taskname:'string'
})

const Task=new mongoose.model('task',TaskSchema);

// const task1 = new Task( {taskname:"good work"});
// task1.save((err)=>{
//     if(err){console.log(err);}
//     else{console.log("saved");}
// })

app.get("/",function(req,res){
    const Date=date();
  Task.find(function(err,foundtasks){
   if(err){console.log(err);}
   else{
    res.render("list",{kindofDay:Date,tasksentered:foundtasks});
   }
  })
 
})

app.post("/",function(req,res){
const task=req.body.enteredtask;
const newtask= new Task({taskname:task});
newtask.save();
res.redirect("/");
})

app.post("/delete",function(req,res){
const index = req.body.checkbox;
Task.findByIdAndRemove(index,(err)=>{
    if(!err){console.log("deleted");
             res.redirect("/");}
})
})

app.listen(3000,function(res,req){
    console.log("Server port 3000 is up & running");
})