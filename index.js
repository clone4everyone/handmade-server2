const express=require("express");
const cors=require("cors");
const cloudinary = require("cloudinary")
const mongoose=require("mongoose");
const UserRoutes = require("./routes/UserRoutes.js");
const UploadProductRoutes=require("./routes/UploadProductRoutes.js");
const app=express();
require("dotenv").config();

app.use(cors());
app.use(express.json({limit:'1000mb'}));
app.use("/api/auth",UserRoutes);
app.use('/upload',UploadProductRoutes);

cloudinary.config({
    cloud_name: "duhadnqmh",
    api_key: "848465882823534",
    api_secret: "Y_3JPUnLtfQALfq2SGcuNDpi5do",
  });


mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log("mongoose connection successfully");
    
}).catch((err)=>{
    console.log("error occuring while connection mongoose",err)
})
const server=app.listen(7000 || 2200,()=>{
    console.log("server is running  at port",7000);
})