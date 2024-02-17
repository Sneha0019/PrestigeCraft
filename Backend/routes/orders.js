const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const {body, validationResult} = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
const Products = require("../models/Products");

//----ROUTE 1 : Add a product to the cart ... POST : /api/orders/addproducttocart...LOGIN IS REQUIRED
router.post("/addtocart", fetchuser, 
 async (req, res) => {
    let success = false;

    try {
        const { product } = req.body;
        const items = [{}];
        const productId = product._id;

        //--ENSURIING THAT THE PRODUCT DOESNT EXIST ALREADY in Orders database for prevention of dublication
        const existingOrder = await Orders.findOne({'items.productId': productId});

        if(existingOrder){
            return res.status(400).json("Product already exist in Orders");
        }

        const orderItems = await items.map(item => ({
            productId: productId,
            productUrl: product.imageUrl,
            productName: product.productName, 
            productWeight: product.weight,
            // quantity: product.quantity,
            price: product.price 
        }));

        const newOrder = await new Orders({
            customer: req.user.id,
            items: orderItems,
            totalPrice: 0
            // status: status
        });

         const order = await newOrder.save();
        success = true;
        res.status(200).json({success, order});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success, error: "Internal Server Error" });
    }
});

//----ROUTE 2 : Update a product to the cart ... POST : /api/orders/updateproduct...LOGIN IS REQUIRED
router.put("/updatecart/:id", fetchuser, async (req, res) => {
    try {
        let {totalPrice, items} = req.body;
        let order = await Orders.findById(req.params.id);
        if(!order) {return res.status(404).send("Order of this id doesnt found")};


//updating totalprice
        let totalprice = 0;
        if (items) {
            items.forEach(item => {
                totalprice += item.price * item.quantity;
            });
            
        }
        
        const NewOrder = {};


        //updating items
        if (items) {
            NewOrder.items = items.map(item => ({
                productId: order.items[0].productId,
                productUrl:order.items[0].productUrl,
                productName:order.items[0].productName,
                productWeight:order.items[0].productWeight,
                price: item.price,
                quantity: item.quantity
            }));
        }

        if(totalPrice){NewOrder.totalPrice=totalprice}


      

        if(order.customer.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }

        order = await Orders.findByIdAndUpdate(req.params.id, {$set: NewOrder}, {new: true});
      

        res.json({order});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


//ROUTE 3: To fetch all customer data: login required  GET:/api/orders/fetchuserdata.....
router.get("/fetchorderdata", fetchuser, async(req, res)=>{
    try{
        console.log("get into fetching")
      const orders = await Orders.find({customer: req.user.id});
      console.log(orders);
      res.json(orders);

    }catch(error){
        res.status(500).json("Internal server error")
    }

});



//ROUTE 4: To remove product login required
router.delete("/removeproduct/:id", fetchuser, async(req, res)=>{
    try{
       let orders = await Orders.findById(req.params.id);
       if(!orders){
        res.status(404).json("Not found");
       }

       if(orders.customer.toString()!==req.user.id){
        res.status(401).json("Not allowed");
       }

       orders = await Orders.findByIdAndDelete(req.params.id);
       res.json({"success": "Note has been deleted", orders:orders});


    }catch(error){
        res.status(500).json("Internal Server Error")
    }

})



router.post("/addtocart", fetchuser, 
 async (req, res) => {
    let success = false;

    try {
        const { product } = req.body;
        const items = [{}];
        const productId = product._id || product.productId;

        //--ENSURIING THAT THE PRODUCT DOESNT EXIST ALREADY in Orders database for prevention of dublication
        const existingOrder = await Orders.findOne({'items.productId': productId});

        if(existingOrder){
            return res.status(400).json("Product already exist in Orders");
        }

        const orderItems = await items.map(item => ({
            productId: productId,
            productUrl: product.imageUrl || product.productUrl,
            productName: product.productName, 
            productWeight: product.weight || product.productWeight,
            // quantity: product.quantity,
            price: product.price 
        }));

        console.log("order items................ from backend", orderItems);

        const newOrder = await new Orders({
            customer: req.user.id,
            items: orderItems,
            totalPrice: 0
            // status: status
        });

         const order = await newOrder.save();
        success = true;
        res.status(200).json({success, order});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success, error: "Internal Server Error" });
    }
});

//ROUTE 5: ONLY UPDATE TOTALPRICE


//ROUTE 6: ONLY UPDATE QUANTITY --->OPTIONAL

module.exports = router;
