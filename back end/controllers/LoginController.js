const asyncHandler = require('express-async-handler');
const userData = require('../db/usersData'); //local username and password
const jwt = require('jsonwebtoken');
const loginUser = asyncHandler(async(req,res)=>{
    const {name, password} = req.body;
    if(!name || !password){
        res.status(400);
        throw new Error('Please Provide a Name and a password');
    }
    
    if((userData.name == name) && (userData.password == password)){
        const token = generateToken(name);
        res.status(200).json({token});
    }else{
        res.status(400);
        throw new Error('User is not authenticated');
    }
});

     function generateToken(name){
         return jwt.sign({name}, process.env.JWT_SECRET, {expiresIn:'30d'});
    }

module.exports = {
    loginUser,
}
