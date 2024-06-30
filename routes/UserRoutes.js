const UserRoutes=require('express').Router();
const {signin,verifyUsername,sellerProfileData,updateChanges,profileImage,changeProfileImage,login,login2,updatePassword}=require('../controllers/UserController.js')
UserRoutes.post("/sign-in",signin);

UserRoutes.post("/verifyUsername",verifyUsername)
UserRoutes.post('/sellerProfileData',sellerProfileData)
UserRoutes.post('/updateChanges',updateChanges);
UserRoutes.post('/profileImage',profileImage);
UserRoutes.post("/changeProfileImage",changeProfileImage)
UserRoutes.post("/login",login)
UserRoutes.post("/login2",login2)
UserRoutes.post("/updatePassword",updatePassword)
// UserRoutes.post('/updatePic',updatePic)
module.exports=UserRoutes