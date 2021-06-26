const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const router = require('express').Router(); 
require("dotenv").config();
const bcrypt = require('bcryptjs')
const Authenticate = require('../middleware/authenticate')

router.post('/register' ,async function(req, res){
    console.log(req.body)
    const { name,email,phone,work,password,confirmPassword} = req.body;
    
    // if(!name || !email || !phone || !work || !password || !confirmPassword){
    //     return res.status(422).json({error : "please Fill All field Properly"})
    // }
    try{
    const userExits = await User.findOne({email : email})
   
        if(userExits){
            return res.status(422).json({error : "Email already Exits"})
        }
        if(password != confirmPassword){
            return res.status(422).json({error : "Password Not Matched"})
        }
        else{
            const user = new User({name , email , phone , work , password , confirmPassword});
            await user.save();
            console.log("USer Register")
            return res.status(200).json({Message : "USer Register Successfully"})
        }
        
        
        
    }catch(err)
    {
        console.log(err);
    }
    

    })



router.post('/login',async (req ,res)=>{
    try{
        const { email , password } = req.body;
        if(!email || !password){
            return res.status(400).json({error :"Plz filled the Data"})
        }   

        const userExits = await User.findOne({email : email})
        if(userExits){
            
            const isMatch = await bcrypt.compare(password , userExits.password)
            token = await userExits.generateAuthToken();
            console.log( token )
            res.cookie("jwtoken" , token, {
                             expires:new Date(Date.now() + 2589200000),
                            httpOnly:true
                        })
    
            if(! isMatch){
                res.status(420).json("Invalid  Credential")
            }
            else{
                res.status(200).json({message: "user login Successfully", token: token})
            }

        }
        else{
            res.status(420).json("Invalid  Credential")
        }
    
}catch (err){
    console.log(err)
}
})


router.get('/about', (req,res) => {
    console.log("Hello My About")
    res.send(req.rootUser);
    console.log(req.rootUser)
  });

module.exports = router;