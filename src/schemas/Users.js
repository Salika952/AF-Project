const mongoose=require('mongoose');

const UsersSchema=new mongoose.Schema({
    user_name:{type:String,required:true,trim:true},
    user_dob:{type:String,required:true,trim:true},
    user_telephone:{type:Number,required:true},
    user_address:{type:String,required:true,trim:true},
    user_role:{type:String,required:true,trim:true},
});
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;
