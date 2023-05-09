const mongoose=require('mongoose');

const employeesSchema= new mongoose.Schema({
    name:{
        type:String},
    email:{

        type:String,
    },
    salary:{
        type:String,
    
    },
    designation:{
        type:String
    },
    role:{
        type:String
    }
});

module.exports=mongoose.model('Employees',employeesSchema);