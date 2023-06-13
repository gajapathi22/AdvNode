const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const {authenticateToken ,secretKey }= require('../middleware/requireLogin');


// console.log(secretKey);


router.use(bodyParser.json());

router.post('/register',async(req,res)=>{
    const {user_name,password} = req.body;

    //validate the request
    if (!user_name || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
    
    try{
        // console.log('111')
        const existingUser = await userModel.findOne({user_name});
        // console.log('2222')
        if(existingUser){
            return res.status(409).json({ message: 'User already exists' });
        }

        //Hash the  passwordd
        const hashedPassword = await bcrypt.hash(password,10);

        // console.log('3333')
        //Create the new user
        const newUser = new userModel({user_name,password:hashedPassword});
        await newUser.save();
        // console.log('4444')
        res.status(201).json({ message: 'Registration successful' });

    }catch(error){
        console.error('Error during registration',error);
        res.status(500).json({ message: 'Error during registration', error });
    }
    // res.send('Post API');
    
});

router.post('/login',async(req,res)=>{

  const {user_name,password} = req.body;


  //validate the request
  if(!user_name || !password){
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try{
    // Check if the user exists in the database
    const user = await userModel.findOne({ user_name});
    console.log(user) 

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or passworddd' });
      }
  
      // Validate the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch)
      console.log(password)
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Iiiinvalid email or password' });
      }

    const token = jwt.sign({user_name:user.user_name},secretKey,{expiresIn:'1h'});
    res.json({message:'Login successful',token});

  }catch{
    res.status(500).json({ message: 'Error during login', error });
  }
})


module.exports = router;