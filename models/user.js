const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String},
    email:{

        type:String,
    },
    password:{
        type:String,
    
    },
    role:{
        type:String,
        enum:['admin','manager','employee'],
        default:'employee'
    }
});


const roleSchema= new mongoose.Schema({
   user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   admin:{
    type:String
   },
   manager:{
    type:String
   },
   employee:{
    type:String
   }
});
module.exports=mongoose.model('User',userSchema);
module.exports=mongoose.model('Role',roleSchema);