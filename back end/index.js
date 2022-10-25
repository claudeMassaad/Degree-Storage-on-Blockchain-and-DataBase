const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const dotenv = require('dotenv').config();
const connectDB = require('./db/connect');
const cors = require('cors');

//app.use(cors({origin: 'https://foo.com',}));
//access control allow origin

app.use({
    origin:'https//foo.com',
    methods:["GET","POST"],
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors);
app.use('/',require('./routes/pdfHashRoutes'));
 

connectDB();

app.listen(port,()=>{
    console.log(`server is up at 3000`);
});