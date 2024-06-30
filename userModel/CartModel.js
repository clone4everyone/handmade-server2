const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    mainId:{
        type:String
    },
    cartId:{
      type:String
    },
    productId:{
     type:String
    },
productname:{
    type:String
},
productcategory:{
    type:String
},
writtenprocess:{
    type:String
},
mainproductimage:{
    type:String
},
ownername:{
type:String
},
alternativeImages:{
    type:Array
},
productVideo:{
    type:String
},
comments:[{
    profileImage:{type:String},
    name:{type:String},
    comment:{type:String},
    date:{type:Date,default:Date.now}
}],
views:{
    type:Number,
    default:200
},
live:{
    type:Boolean,
    default:false
},
productPrice:{
    type:Number,
}

},{timestamps:true});

module.exports=mongoose.model("Cart",userSchema);