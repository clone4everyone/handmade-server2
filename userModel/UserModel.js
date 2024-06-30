const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        max:50,
    },
    profileImage:{
        type:String,
       default:''
    },
    phoneNumber:{
        type:Number
    },
    country:{
        type:String,
        default:'Not Mention',

    },
    state:{
        type:String,
        dafault:'Not Mention',

    },
    city:{
        type:String,
        default:'Not Mention'
    },
    category:{
        type:String,
    },
    password:{
        type:String
    }
    

  
},{timestamps:true})


module.exports=mongoose.model("Users",userSchema);