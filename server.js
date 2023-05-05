const express=require('express');
const port=process.env.PORT || 3000;
const app=express();
const http = require ('http');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const registerRoutes=require('./routes/register.js');
const employeeRoutes=require('./routes/employee.js')
const path=require('path');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
dotenv.config();
mongoose.connect('mongodb+srv://devajitgupta:8604564523@cluster0.rpmmn5h.mongodb.net/?retryWrites=true&w=majority');
 
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});


//-- middlewear
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//-- routes middlewear
app.use('/',registerRoutes);
app.use('/',employeeRoutes);

app.use(express.json());


app.listen(port,()=>{
    console.log("server is listen on port " + port)
});