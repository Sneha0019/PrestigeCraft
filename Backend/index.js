require("../Backend/db")
const express = require("express");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["https://ecommerce-website-using-react-cyan.vercel.app/"],
    methods:["POST", "GET", "DELETE"],
    credentials: true, 
}));

app.use(express.json());
app.use("/api/auth/", require("./routes/auth"))
app.use("/api/products", require("./routes/products"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/wishlists", require("./routes/wishlists"))

//routings

app.get("/" ,(req, res)=>{
    res.send("hello this is jewlw");
})


app.get("/login", (req, res)=>{
    try{
    res.send("this is login");
    }catch(error){
        res.status(500).send("internal server error")
    }
})

app.get("/signup", (req, res)=>{
    res.send("this is signup");
})

app.listen(PORT, ()=>{
    console.log(`Jewel Backend is listening ${PORT}`);
})

