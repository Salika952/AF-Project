const mongoose=require('mongoose');

const NotificationSchema=new mongoose.Schema({
    noti_users: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    noti_message:{type:String,required:true,trim:true},
},{
    timestamps:true
});
const Notification = mongoose.model('Payment', NotificationSchema);
module.exports = Notification;