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
mongoose.connect('mongodb+srv://devajitgupta:8604564523@cluster0.rpmmn5h.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
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