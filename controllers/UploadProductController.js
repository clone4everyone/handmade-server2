const Upload=require("../userModel/ProductModel.js");

const cloudinary = require("cloudinary");

exports.uploadProduct = async (req, res, next) => {
    try {
      const { productId, productVideo, productName, productcategory, writtenprocess, mainproductimage, alternativeImages,productPrice,ownername } = req.body;
      const arr = [];
      // Upload alternative images to Cloudinary
      for (let i = 0; i < alternativeImages.length && i < 5; i++) {
        if (alternativeImages[i] && alternativeImages[i] !== '') {
          const cloud = await cloudinary.v2.uploader.upload(alternativeImages[i], {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
          arr.push(cloud.url);
        }
      }
  
      // Upload main product image to Cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(mainproductimage, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      // Create a new entry in the database with uploaded data
      const data = await Upload.create({
        productId,
        productVideo,
        productname:productName,
        productcategory,
        writtenprocess,
        mainproductimage: myCloud.url,
        alternativeImages: arr,
        live:true,
        productPrice,
        ownername
      });
  
      res.json({ status: true, data });
    } catch (error) {
      res.status(500).json({ status: false, error: 'Error uploading product' });
    }
  };

  exports.liveProduct=async(req,res,next)=>{
    try{
     const {productId}=req.body;
     const data=await Upload.find({productId});
       return res.json({data,status:true});
    }catch(err){
      next(err)
    }
  }
  exports.inactiveProduct=async(req,res,next)=>{
    try{
      const {productId}=req.body;
      const data=await Upload.find({productId ,live:false});
        return res.json({data,status:true});
     }catch(err){
       next(err)
     }
  }

  exports.setProductLive=async(req,res,next)=>{
    try{
      const {productId}=req.body;
      await Upload.updateOne({_id:productId},{$set:{live:true}});
        return res.json({status:true});
     }catch(err){
       next(err)
     }
  }
  exports.setProductInactive=async(req,res,next)=>{
    try{
      const {productId}=req.body;
      await Upload.updateOne({_id:productId},{$set:{live:false}});
        return res.json({status:true});
     }catch(err){
       next(err)
     }
  }
 
  
  exports.fetchProduct=async(req,res,next)=>{
    try{
      const {_id}=req.body;
      const data=await Upload.findOne({_id});
        return res.json({status:true,data});
     }catch(err){
       next(err)
     }
  }

  exports.editProduct=async(req,res,next)=>{
    try{
      const { productId,
        productname,
        productcategory,
        writtenprocess,}=req.body;
      await Upload.updateOne({_id:productId},{$set:{productname,productcategory,writtenprocess}});
        return res.json({status:true});
     }catch(err){
       next(err)
     }
  }

  exports.chartData=async(req,res,next)=>{
    try{
      const {productId}=req.body;
      const data=await Upload.find({productId});
        return res.json({data,status:true});
    }catch(err){
      next(err)
    }
  }

 

  exports.allProducts=async(req,res,next)=>{
    try{
   const {price,featured,category}=req.body;
   let query={};
   if(category!=='All'){
     query = {
      productPrice: { $gte: price },
      productcategory: category
    }
   }else{
    query = {
      productPrice: { $gte: price },
    }
  }

  let sortOptions = {};

  switch (featured) {
    case 'Alphabetically A to Z':
      sortOptions = { productname: 1 };
      break;
    case 'Alphabetically Z to A':
      sortOptions = { productname: -1 };
      break;
    case 'Price low to high':
      sortOptions = { productPrice: 1 };
      break;
    case 'price high to low':
      sortOptions = { productPrice: -1 };
      break;
    case 'Date new to old':
      sortOptions = { createdAt: -1 };
      break;
    case 'Date old to new':
      sortOptions = { createdAt: 1 };
      break;
    default:
      sortOptions = { name: 1 }; // Default sort order
  }

  // Retrieve the filtered and sorted documents
  const filteredProducts = await Upload.find(query).sort(sortOptions);

return res.json({status:true,filteredProducts})
    }catch(err){
   next(err)
    }
  }

  exports.searchData=async(req,res,next)=>{
    try{
const {search}=req.body;
 const data=await Upload.find({
  productname: { $regex: search, $options: 'i' } // Case-insensitive regex search
})
return res.json({data,status:true});
    }catch(err){
      next(err);
    }
  }

  exports.productView=async(req,res,next)=>{
    try{
     const {_id}=req.body;
     const data=await Upload.findOne({_id});
     await Upload.updateOne({_id},{ $inc: { views: 1 } })
    return res.json({status:true,data});
    }catch(err){
      next(err)
    }
  }
  exports.otherProduct=async(req,res,next)=>{
    try{
     const {productcategory}=req.body;
     const data=await Upload.find({productcategory});
    return res.json({status:true,data});
    }catch(err){
      next(err)
    }
  }

  exports.addComment=async(req,res,next)=>{
    try{
      const { _id,comment,name,profileImage}=req.body;
      await Upload.updateOne({_id}, { $push: { comments: {name,profileImage,comment} } })

      return res.json({status:true});
    }catch(err){
      next(err)
    }
  }

  exports.commentData=async(req,res,next)=>{
    try{
     const {_id}=req.body;
     const respond=await Upload.findOne({_id});
    const data=respond.comments;
    return res.json({status:true,data});

     }
      catch(err){
        next(err)
      }
    
  }
