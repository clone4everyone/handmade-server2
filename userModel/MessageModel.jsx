const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
  
    message:{
        text:{
            type:String,
            required:true,
        }, 
    },
        users:Array,
        sender:{
            type:String,
            required:true
        },
        receiver:{
            type:String,
            required:true
        },
        fromImage:{
            type:String
        },
        fromName:{
            type:String
        },
        toImage:{
            type:String
        },
        toName:{
            type:String
        }
   
  
},{timestamps:true})


module.exports=mongoose.model("Messages",messageSchema);