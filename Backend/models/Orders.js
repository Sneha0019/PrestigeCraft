const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
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
            required:true
        },
        productName:{
        type:String,
        required:true
        },
        productWeight:{
            type: String,
            required:true
        },
        quantity:{
            type: Number,
            default: 1,
            required:true
        },
        price:{
         type: Number,
        required: true,
        }
       
    }],
    shippingDetails:{
        address:{
            type:String,
            
        },
        contactNumber:{
            type:Number,
           
        }
    },
    totalPrice:{
        type: Number,
        required:true,
    },
    status:{
        type:String,
        default:'pending',
        required:true,
    },
    orderDate:{
        type: Date,
        default: Date.now
    },
    
});


// OrderSchema.post(['save'], function (next){
//     let totalprice = 0;
//     this.items.forEach(item => {
//         console.log("cme for val")
//         totalprice+=item.price * item.quantity;
//     });

//     console.log(totalprice)
 
//     this.totalPrice = totalprice;

    
//     next();

// });

const Orders = new mongoose.model('Orders', OrderSchema);
module.exports = Orders;