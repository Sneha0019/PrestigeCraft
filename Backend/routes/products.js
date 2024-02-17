const express = require("express");
const router = express.Router();
const Products = require("../models/Products");
const {body, validationResult} = require("express-validator");
var fetchuser = require("../middleware/fetchuser")

//----ROUTE 1: Adding a product in database;  POST "/api/products/addproduct". -----
router.post("/addproduct", [
    body("imageUrl", "url should be more than 10 characters").isLength({min: 5}),
    body("productName", "product name must be more than 5 characters").isLength({min:5}),
    body("description", "description name must be more than 3 characters").isLength({min:3}),
    body("price", "Enter valid price").isNumeric(),
    body("category", "should me more than 2 characters").isLength({min:2}),
    body("stockQuantity", "should not be empty"),
    body("material", "character should me more than 3").isLength({min:3}),
    body("weight", "Enter weight"),
    body("dimension", "Enter valid dimension").isLength({min:2}),
], async (req, res)=>{
    let success = false;

    const errors = validationResult(req);
    //--if validation fails---
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }


    try{
     let product = await Products.findOne({imageUrl: req.body.imageUrl});

     if(product){
        return res.status(400).json({success, error: "product already exist"});
     }

     //----if product not exist----
     product = await Products.create({
        imageUrl: req.body.imageUrl,
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stockQuantity: req.body.stockQuantity,
        material:req.body.material,
        weight: req.body.weight,
        dimension: req.body.dimension
     })

     success = true;
     res.json({success, product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});


//----ROUTE 2: getting all data istored in database;  POST "/api/products/fetchallproducts". -----
router.get("/fetchallproducts", async (req, res)=>{
    let success = false;

    try{
     let product = await Products.find({});

     if(!product){
        return res.status(400).json({success, error: "No products"});
     }

     res.json({product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});

//----ROUTE 2.1: getting all data istored in database;  POST "/api/products/ring". -----
router.get("/ring", async (req, res)=>{
    let success = false;

    try{
     let product = await Products.find({});

     if(!product){
        return res.status(400).json({success, error: "No products"});
     }

     product = product.filter(product => product.category==="Ring");
     console.log(product);
     success = true;
     res.json({success, product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});

//----ROUTE 2.2: getting all data istored in database;  POST "/api/products/earring". -----
router.get("/earring", async (req, res)=>{
    let success = false;

    try{
     let product = await Products.find({});

     if(!product){
        return res.status(400).json({success, error: "No products"});
     }

     product = product.filter(product => product.category==="Earrings");
     console.log(product);
     success = true;
     res.json({success, product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});

//----ROUTE 2.3: getting all data istored in database;  POST "/api/products/nosering". -----
router.get("/nosering", async (req, res)=>{
    let success = false;

    try{
     let product = await Products.find({});

     if(!product){
        return res.status(400).json({success, error: "No products"});
     }

     product = product.filter(product => product.category==="Nosering");
     console.log(product);
     success = true;
     res.json({success, product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});

//----ROUTE 2.4: getting all data istored in database;  POST "/api/products/bracelet". -----
router.get("/bracelet", async (req, res)=>{
    let success = false;

    try{
     let product = await Products.find({});

     if(!product){
        return res.status(400).json({success, error: "No products"});
     }

     product = product.filter(product => product.category==="Bracelet");
     console.log(product);
     success = true;
     res.json({success, product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});

//----ROUTE 2.5: getting all data istored in database;  POST "/api/products/bangles". -----
router.get("/bangles", async (req, res)=>{
    let success = false;

    try{
     let product = await Products.find({});

     if(!product){
        return res.status(400).json({success, error: "No products"});
     }

     product = product.filter(product => product.category==="Bangles");
     console.log(product);
     success = true;
     res.json({success, product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});

//----ROUTE 2.6: getting all data istored in database;  POST "/api/products/necklace". -----
router.get("/necklace", async (req, res)=>{
    let success = false;

    try{
     let product = await Products.find({});

     if(!product){
        return res.status(400).json({success, error: "No products"});
     }

     product = product.filter(product => product.category==="Necklace");
     console.log(product);
     success = true;
     res.json({success, product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});

//----ROUTE 2.1: getting all data istored in database;  POST "/api/products/anklets". -----
router.get("/anklets", async (req, res)=>{
    let success = false;

    try{
     let product = await Products.find({});

     if(!product){
        return res.status(400).json({success, error: "No products"});
     }

     product = product.filter(product => product.category==="Anklet");
     console.log(product);
     success = true;
     res.json({success, product});
        

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});



//----ROUTE 3: Editing the product;  POST "/api/products/updateproduct". -----
router.post("/updateproduct/:id", async (req, res)=>{
    const {imageUrl, productName, description, price, category, stockQuantity, material, weight, dimension} = req.body;

    const newProduct = {};
    if(imageUrl){newProduct.imageUrl = imageUrl};
    if(productName){newProduct.productName = productName};
    if(description){newProduct.description = description};
    if(price){newProduct.price = price};
    if(category){newProduct.category = category};
    if(stockQuantity) {newProduct.stockQuantity = stockQuantity};
    if(material) {newProduct.material = material};
    if(weight) {newProduct.weight = weight};
    if(dimension) {newProduct.dimension = dimension};


    let success = false;
    let product = await Products.findById(req.params.id);
    if(!product) {res.status(400).json({success, error:"requested id not exist"})};

    try{

        product = await Products.findByIdAndUpdate(req.params.id, {$set : newProduct}, {new : true});
        success = true;
        res.json({success, product});
     
     }catch(error){
        res.status(500).json({success, error: "Internal Server error occured"})
     }

});

//----ROUTE 4: Deleting a product from database;  DELETE "/api/products/delete". -----
router.delete("/deleteproduct/:id", async (req, res)=>{
    let success = false;

     let product = await Products.findById(req.params.id);

     if(!product){
        return res.status(404).json({success, error: "product not found"});
     }

     try{

        product = await Products.findByIdAndDelete(req.params.id)  
        success = true;
        res.json({success, product});    

    }catch(error){
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});

    }

});




module.exports = router;