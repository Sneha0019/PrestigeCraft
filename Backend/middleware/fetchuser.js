require('dotenv').config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;


const fetchuser =  ((req, res, next)=>{
    const token = req.header("auth-token");

    if(!token){
        return res.status(400).json({error:"please enter a valid token"});
    }

    //---if valid then verify
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        console.log("token verified")
        next();


    }catch(error){
        return res.status(401).json({error: "come error occured"})
    }
    

})

module.exports = fetchuser;