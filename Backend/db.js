const mongoose = require("mongoose");
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connection successfull...");
}).catch((e)=>{
    console.log("no successfull connection...");
})
