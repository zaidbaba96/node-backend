const jwt = require("jsonwebtoken")
const User = require('../models/userSchema')
module.exports = Authenticate = async (req, res, next)=>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken =  jwt.varify( token , process.env.SECRET_KEY )
        console.log(token)
        console.log(verifyToken)
        const rootUser = await User.findOne({ _id: verifyToken._id , "tokens.token": token  });
        console.log(rootUser)

        if(!rootUser){ throw new Error('User not Found') }
        
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch(err){
        res.status(401).send("Unauthorised : No token Provided")
        console.log(err)
    }   
    
}

//module.export = Authenticate