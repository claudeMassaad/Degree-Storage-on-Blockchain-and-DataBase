const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = 3000;
const connectDB = require('./db/connectDB');
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
//Routes
app.use('/pdf',require('./routes/pdfRoutes'));
app.use('/',require('./routes/userRoutes'));

//create an endpoint that receives a pdf and must return to which root it belongs


connectDB();
app.listen(port,()=>{
    console.log(`server is alive at ${port}`);
});