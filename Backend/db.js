const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://snehamenat029:sneha_029@cluster0.5domade.mongodb.net/ecommTest/test")
.then(()=>{
    console.log("connection successfull...");
}).catch((e)=>{
    console.log("no successfull connection...");
})