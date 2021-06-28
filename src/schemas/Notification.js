const mongoose=require('mongoose');

const NotificationSchema=new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    expire : {
        type : Date,
    },
    date:{
        type : Date,
        default : Date.now()
    }
},{
    timestamps:true
});
const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;