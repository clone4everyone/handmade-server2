const Cart=require("../userModel/CartModel.js");

exports.addCart=async(req,res,next)=>{
    try{
       const {cartId,elem}=req.body;
       await Cart.create({
        mainId:elem._id,
        cartId,
        productId:elem.productId,
        productVideo:elem.productVideo,
        productname:elem.productname,
        productcategory:elem.productcategory,
        writtenprocess:elem.writtenprocess,
        mainproductimage: elem.mainproductimage,
        alternativeImages: elem.alternativeImages,
        live:elem.live,
        productPrice:elem.productPrice,
        ownername:elem.ownername
      });
  
    return   res.json({ status: true });
    } catch(err){
            next(err)
        }
}

exports.allCart=async(req,res,next)=>{
    try{
     const {cartId}=req.body;
     const data=await Cart.find({cartId});
    return res.json({status:true,data});
    }catch(err){
        next(err);
    }
}

exports.removeCart=async(req,res,next)=>{
    try{
        const {cartId,productname}=req.body;
        await Cart.deleteOne({cartId,productname})
        return res.json({status:true});
    }catch(err){
        next(err);
    }
}