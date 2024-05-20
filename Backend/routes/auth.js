const express = require('express')
const router = express.Router(); 
const User = require('../models/Users')
const { query,body ,validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require('jsonwebtoken')
// thing with authtoken is that you get a new token each time you use jwt.sign and each token is valid ie a previously generated token will be valid until and unless a expiry time is associated with it
const JWT_secret = 'miketheking'
const fetchuser = require('../middleware/fetchuser')


router.get('/',query('name').notEmpty(),(req,res)=>{

    const result = validationResult(req)
    console.log(result)
    if(result.isEmpty()){
        console.log("using get request req body:",req.body )
        // const user = User(req.body);
        // user.save()
        return res.send(req.query)
    }
    res.send({errors:result.array()});
}
).post('/createuser',body('name').notEmpty(),body('email').isEmail(),body('password').isLength({min:7}),async (req,res)=>{  
    const result = validationResult(req);
    // console.log(result)
    // console.log("req body : ",req.body)
    if(result.isEmpty()){
    let user = await User.findOne({email : req.body.email})
    if(user){
       return res.status(400).json({error:"User already exist ",user:`${user}`})
    }
    try{
        const salt = await bcrypt.genSalt(saltRounds)
        // console.log('Salt: ', salt)
        const hash = await bcrypt.hash(req.body.password,salt)
        // console.log(hash)
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : hash
        })
        // console.log("user : ",user)
        // console.log(typeof("user id : ",user.id))
        const payload = {user:{id : user.id}}
        // console.log("payload : ",payload)
        const authtoken = jwt.sign(payload,JWT_secret)
        // console.log('authtoken : ',authtoken)
      return  res.status(200).json({authtoken:authtoken})
    //    return res.json({user:user});
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({error:"some error occured"})
    }       
    }
    else
    res.status(400).send({ errors: result.array() });

   
}).post('/login',body('email',"Enter a valid email").isEmail(),body('password',"password cannot be blank").exists(),async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({error:errors.array})
    }
    const {email,password}=req.body
    try {
        const user = await User.findOne({email : email})
        if(!user){
          return  res.status(400).json({error:"Invalid Username or Password"})
        }
        const passwordcompare = await bcrypt.compare(password,user.password)
        if(!passwordcompare){
          return  res.status(400).json({error:"Invalid Username or Password"})
        }

        // console.log(typeof("user id : ",user.id))
        const payload = {user:{id : user.id}}
        // console.log("payload : ",payload)
        const authtoken = jwt.sign(payload,JWT_secret)
        // console.log('authtoken : ',authtoken)
      return  res.status(200).json({authtoken:authtoken})
    } catch (error) {
        // console.error(error.message)
        res.status(500).json({error:"some error occured"})
    }
}).get('/fetchuserdetails',fetchuser,async (req,res)=>{
    // this piece of code fetches user details after he logs in
    console.log(req.user)
    try{
        // const user = await User.findOne({id:req.user.id})
        const userid =  req.user.id
        const user = await User.findById(userid)
        // console.log(user)
        if(user){
            res.status(200).json({user:user})
        }
        else{
            res.status(400).json({error : "User doesn't exist"})
        }
    }catch(error){
        res.status(500).json({error : "Some internal eror occureed"})

    }
})


module.exports = router

