const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');


const authMiddleWare = asyncHandler(async(req,res,next)=>{
    let token;
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded){
                res.status(400);
                throw new Error('INVALID TOKEN!');
            }
            req.user = decoded;
            next();

        }catch(err){
            res.status(200);
            console.log(err);
            throw new Error('WRONG TOKEN!');
        }
    }else{
        res.status(400);
        throw new Error('No token was sent, user is not logged in!');
    }
})

module.exports = authMiddleWare;





