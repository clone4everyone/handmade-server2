const Users=require("../userModel/UserModel.js");
const bcrypt=require("bcrypt");
const cloudinary = require("cloudinary");
exports.signin=async(req,res,next)=>{
try{
 const {username,email,phoneNumber,category,password}=req.body;

 const usernameExist=await Users.findOne({username});
 if(usernameExist){
  return res.json({msg:"username Already Exist",status:false});
 }
 const phoneNumberExist=await Users.findOne({phoneNumber})
 if(phoneNumberExist){
  return res.json({msg:"phone Number Already Exist",status:false});
 }


const hashedPassword=await bcrypt.hash(password,10);
const user=await Users.create({
  username,
  email,
  phoneNumber:phoneNumber,
  category,
  password:hashedPassword
});

 return res.json({user,status:true});
}
catch(err){
  next(err)
}


}

exports.verifyUsername=async(req,res,next)=>{
  try{
    const {username}=req.body;

    const usernameExist=await Users.findOne({username});
    if(usernameExist){
     return res.json({msg:"username Already Exist",status:false});
    }
    return res.json({status:true})
  }catch(err){
    next(err);
  }
}

exports.sellerProfileData=async(req,res,next)=>{
  try{
   const {_id}=req.body;
   const data=await Users.findOne({_id:_id});
   res.json({data,status:true});
  }catch(err){
    next(err)
  }
}
exports.updateChanges=async(req,res,next)=>{
  try{
  const {_id,email,name}=req.body;
  const exist=await Users.findOne({username:name});
  if(exist){
    return res.json({status:false,msg:'Name Already Exist Choose Different name'});
  }
  await Users.updateOne({ _id: _id }, { $set: { email: email,username:name } });


  res.json({status:true});
  }catch(err){
    next(err);
  }
}

exports.profileImage=async(req,res,next)=>{
  try{
   const {_id}=req.body;
  //  const myCloud = await cloudinary.v2.uploader.upload(img, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });
   const data=await Users.findOne({_id:_id});
   res.json({data,status:true})
  }catch(err){
    next(err)
  }
}

exports.changeProfileImage=async(req,res,next)=>{
  try{
   const {_id,img}=req.body;
   const myCloud = await cloudinary.v2.uploader.upload(img, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
   const data=await Users.updateOne({_id:_id},{$set:{profileImage:myCloud.url}});
   res.json({data,status:true})
  }catch(err){
    next(err)
  }
}
exports.login=async(req,res,next)=>{
try{
const {username,password}=req.body;
const userexist=await Users.findOne({username});
if(!userexist){
  return res.json({msg:"username not exist",status:false})
}
const validatePassword=await bcrypt.compare(password,userexist.password);
if(validatePassword){
  return res.json({userexist,status:true})
}
return res.json({status:false,msg:'incorrect password'});
}catch(exp){
  next(exp)
}
}
exports.updatePassword=async(req,res,next)=>{
  try{
   const {_id,password,changePass}=req.body;
   const user=await Users.findOne({_id});
  const correct= await bcrypt.compare(user.password,password)
  if(correct){
    const change=bcrypt.compare(user.password,changePass)
    if(change){
      return res.json({status:false,msg:'password must Differ from current Password'})
    }
    const hashed=await bcrypt.hash(changePass,10);
    await Users.updateOne({_id},{$set:{password:hashed}});
    return res.json({status:true,msg:'Password changed Successfully'})
  }
  else{
    return res.json({status:false,msg:'Password is Incorrect'})
  }
   
  }catch(err){
    next(err)
  }
}

exports.login2=async(req,res,next)=>{
  try{
  const {username}=req.body;
  const userexist=await Users.findOne({username});
  if(!userexist){
    return res.json({msg:"username not exist",status:false})
  }
    return res.json({userexist,status:true})
  
  }catch(exp){
    next(exp)
  }
  }

// exports.updatePic=async(req,res,next)=>{
//   try{
//  const {id,newImage}=req.body;
//   const myCloud = await cloudinary.v2.uploader.upload(newImage, {
//     folder: "avatars",
//     width: 150,
//     crop: "scale",

//   });
//  await  Users.updateOne({_id:id},{$set:{avatar:myCloud.url}}).then((result) => {
//   console.log('Document updated successfully:',result);
// }).catch((err) => {
//   console.error('Error updating document:', err);
// })

// await  Posts.updateMany({adminId:id},{$set:{profileImage:myCloud.url}}).then((result) => {
//   console.log('Document updated successfully:',result);
// }).catch((err) => {
//   console.error('Error updating document:', err);
// })
//   }catch(err){
//   console.log(err,'this is fucking err')
//   }
 
// }