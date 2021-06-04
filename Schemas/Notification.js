const mongoose=require('mongoose');

const NotificationSchema=new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    message:{type:String,required:true,trim:true},
},{
    timestamps:true
});
const Notification = mongoose.model('Payment', NotificationSchema);
module.exports = Notification;