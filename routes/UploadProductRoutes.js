const UploadProductRoutes=require('express').Router();

const {uploadProduct,liveProduct,inactiveProduct,setProductLive,setProductInactive,fetchProduct,editProduct,chartData,allProducts,searchData,productView,addComment,commentData,otherProduct}=require('../controllers/UploadProductController.js')

const {orders,addMessage,getAllMessage,orders2}=require('../controllers/MessageController.jsx');
const {addCart,removeCart,allCart}=require('../controllers/CartController.js');
UploadProductRoutes.post('/uploadProduct',uploadProduct);
UploadProductRoutes.post('/liveProduct',liveProduct);
UploadProductRoutes.post('/inactiveProduct',inactiveProduct)
UploadProductRoutes.post('/setProductLive',setProductLive)
UploadProductRoutes.post('/setProductInactive',setProductInactive)
UploadProductRoutes.post('/fetchProduct',fetchProduct)
UploadProductRoutes.post('/editProduct',editProduct)
UploadProductRoutes.post("/chartData",chartData)
UploadProductRoutes.post("/allProducts",allProducts)
UploadProductRoutes.post("/searchData",searchData)
UploadProductRoutes.post("/productView",productView)
UploadProductRoutes.post("/addComment",addComment)
UploadProductRoutes.post("/commentData",commentData)
UploadProductRoutes.post("/orders",orders)
UploadProductRoutes.post("/orders2",orders2)
UploadProductRoutes.post("/addMessage",addMessage)
UploadProductRoutes.post("/getAllMessage",getAllMessage)
UploadProductRoutes.post("/addCart",addCart);
UploadProductRoutes.post("/removeCart",removeCart);
UploadProductRoutes.post("/allCart",allCart);
UploadProductRoutes.post("/otherProduct",otherProduct);
module.exports=UploadProductRoutes