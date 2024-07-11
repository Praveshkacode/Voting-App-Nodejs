const express = require('express');
const router = express.Router();

const User =require('./../models/user');
const {jwtAuthMiddleware,generateToken} = require('../jwt');

// post route to add a person
router.post('/signup',async(req,res)=>{

    try{
        const data = req.body // assuming that request body contains person data

    // Create a new user document using the mongoose model
    const newUser = new User(data);
    
    // save the new user to the database
    const response = await newUser.save();
    console.log("Data Saved");

    const payload = {
        id:response.id
    }
    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("Token is : ",token);


    res.status(200).json({response:response ,token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
    
})

// Login routes
router.post('/login', async(req,res)=>{
    try{
        // Extract username and password from the request body
        const {aadharCardNumber,password} = req.body;

        // find the user by username

        const user = await User.findOne({aadharCardNumber:aadharCardNumber});

        // if username does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or Password'});
        }
        // generate token
        const payload = {
            id:user.id,
        }

        const token = generateToken(payload);

        // return token as response
        res.json({token});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// Profile routes
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);

        res.status(200).json({user});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


router.put('/profile/password',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userId = req.user.id; // Extract the id from the user
        const {currentPassword,newPassword} = req.body // Extract current and new password from the request body

        // find the user by the userId
        const user = await User.findById(userId);

         // if password does not match, return error
         if( !(await user.comparePassword(currentPassword))){
            return res.status(401).json({error:'Invalid username or Password'});
        }
        // update the user's password
        user.password = newPassword;
        await user.save();


        console.log("Password updated");
        res.status(200).json({message:"Password updated"});


    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})



module.exports=router;
