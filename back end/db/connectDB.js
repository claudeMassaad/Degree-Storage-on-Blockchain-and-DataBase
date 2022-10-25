const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const connect = mongoose.connect(process.env.MONGO_URI);
        console.log('mongo is connected');
    }catch(err){
        console.log(err);
    }
}
module.exports = connectDB;