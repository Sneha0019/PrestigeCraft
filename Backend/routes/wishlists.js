const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const {body, validationResult} = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
const Products = require("../models/Products");
const Wishlists = require("../models/Wishlists");

//----ROUTE 1 : Add a product to the cart ... POST : /api/orders/addproducttocart...LOGIN IS REQUIRED
router.post("/addtowishlist", fetchuser, 
 async (req, res) => {
    let success = false;
    try {
        const { product } = req.body;

        const items = [{}];
        const productId = product._id;

        //--ENSURIING THAT THE PRODUCT DOESNT EXIST ALREADY in Orders database for prevention of dublication
        const existingProduct = await Wishlists.findOne({'items.productId': productId});

        if(existingProduct){
            return res.status(400).json("Product already exist in Orders");
        }

        const orderItems = await items.map(item => ({
            productId: productId,
            productUrl: product.imageUrl,
            productName: product.productName, 
            productDescription: product.description,
            price: product.price,
            productCategory: product.category,
            quantity: product.stockQuantity,
            productWeight: product.weight,
            productMaterial: product.material,
            productDimension: product.dimension,
        }));

        const newProduct = await new Wishlists({
            customer: req.user.id,
            items: orderItems,
            totalPrice: product.price
        });

         const newProducts = await newProduct.save();
        success = true;
        res.status(200).json({success, newProducts});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success, error: "Internal Server Error" });
    }
});


//ROUTE 2: To fetch all customer data: login required  GET:/api/orders/fetchuserdata.....
router.get("/fetchwishlistdata", fetchuser, async(req, res)=>{
    try{
      const wishlistProduct = await Wishlists.find({customer: req.user.id});
      console.log(wishlistProduct);
      res.json(wishlistProduct);

    }catch(error){
        res.status(500).json("Internal server error")
    }

});


//ROUTE 3: To remove product login required
router.delete("/removefromwishlist/:id", fetchuser, async(req, res)=>{
    try{
       let product= await Wishlists.findById(req.params.id);
       if(!product){
        return res.status(404).json("Not found");
       }

       if(product.customer.toString()!==req.user.id){
       return res.status(401).json("Not allowed");
       }

       product = await Wishlists.findByIdAndDelete(req.params.id);
    return   res.json({"success": "Note has been deleted", product:product});
 

    }catch(error){
       return res.status(500).json("Internal Server Error")
    }

})


module.exports = router;
