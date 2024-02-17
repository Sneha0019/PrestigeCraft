const mongoose = require("mongoose");


const WishlistSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    items:[
        {
        productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required:true
        },
        productUrl:{
            type: String,
           
        },
        productName:{
        type:String,
     
        },
        productDescription:{
            type:String,
          
        },
        price:{
            type: Number,
           
        },
        productCategory:{
            type:String,
            
        },
        quantity:{
            type:Number,
            required:true,
        },
        productWeight:{
            type: String,
            
        },
        productMaterial:{
            type: String,
            
        },
        productDimension:{
            type: String,
           
        }   
    }],
    totalPrice:{
        type: Number,
        required:true,
    },
});



const Wishlists = new mongoose.model('Wishlists', WishlistSchema);
module.exports = Wishlists;