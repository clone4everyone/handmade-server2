const messageModel=require("../userModel/MessageModel.jsx");
const Upload=require("../userModel/ProductModel.js");
exports.orders=async(req,res,next)=>{
  try{
    const {id}=req.body;
    const data=await messageModel.find({sender:id});
   
   if(data){
    return res.json({status:true,data});
    
   }
   return res.json({status:false});
  }catch(err){
    next(err)
  }
}
exports.orders2=async(req,res,next)=>{
  try{
    const {id}=req.body;
    const data=await messageModel.find({receiver:id});
   
   if(data){
    return res.json({status:true,data});
    
   }
   return res.json({status:false});
  }catch(err){
    next(err)
  }
}
exports.addMessage=async(req,res,next)=>{
 try{
  const {from,to,msg,fromName,fromImage,toName,toImage}=req.body;
  console.log('msg added')
  const data=await messageModel.create({
    message:{text:msg},
    users:[from,to],
    sender:from,
    receiver:to,
    fromName,
    fromImage,
    toName,
    toImage,
    
  })
  await Upload.updateOne({_id},{$set:{view:view+1}})
  if(data) return res.json({msg:"Message added successfully",status:true})
  return res.json({msg:"Failed to add message",status:false});
 }catch(err){
    next(err)
 }
  }
  exports.addMessage2=async(req,res,next)=>{
    try{
     const {from,to,msg,fromName,fromImage,toName,toImage}=req.body;
     console.log('msg added')
     const data=await messageModel.create({
       message:{text:msg},
       users:[from,to],
       sender:from,
       receiver:to,
       fromName,
       fromImage,
       toName,
       toImage
     })
     if(data) return res.json({msg:"Message added successfully",status:true})
     return res.json({msg:"Failed to add message",status:false});
    }catch(err){
       next(err)
    }
     }

  exports.getAllMessage=async(req,res,next)=>{
 try{
const {sender,receiver}=req.body;
const messages=await messageModel.find({
  users:{
    $all:[sender,receiver]
  }
}).sort({updatedAt:1});
console.log("messages",messages);
const data=messages.map((msg)=>{
  return {
    fromSelf:msg.sender.toString()===sender,
    message:msg.message.text,
  }
});
// console.log('hell')
// console.log("projectedMessages",data)
res.json({data,status:true});
 }catch(exp){
  next(exp)
 }
  }
  exports.getAllMessage2=async(req,res,next)=>{
    try{
   const {sender,receiver}=req.body;
   const messages=await messageModel.find({
     users:{
       $all:[sender,receiver]
     }
   }).sort({updatedAt:1});
   console.log("messages",messages);
   const data=messages.map((msg)=>{
     return {
       fromSelf:msg.sender.toString()===sender,
       message:msg.message.text,
     }
   });
  
   res.json({data,status:true});
    }catch(exp){
     next(exp)
    }
     }