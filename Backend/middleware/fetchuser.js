const jwt = require('jsonwebtoken')
const JWT_secret = 'miketheking'


const fetchuser = (req,res,next)=>{
try{

    const token = req.header('auth-token')
    if(!token){
       return res.status(400).json({error:"User not logged in"})
    }else{
    const data = jwt.verify(token,JWT_secret)
    // console.log("data",data)
    req.user = data.user
    next();
    }
}catch(error){
    // sometimes user may tamper the token so you wont get the error in if condition but it would generate error in the try block when jwt.verify(token,JWT_sectret) runs and it will go 
    // in the catch block so i need to show please authenticate whth valid token
    res.status(500).json({error:"Please authenticate with valid token/login again",errormessage : error.message})
}
}

module.exports = fetchuser
