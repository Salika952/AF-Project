const mongoose=require('mongoose');

const UsersSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    dob:{type:String,required:true,trim:true},
    telephone:{type:Number,required:true},
    address:{type:String,required:true,trim:true},
    role:{type:String,required:true,trim:true},
});
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;