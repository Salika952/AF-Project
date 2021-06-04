const mongoose=require('mongoose');

const PaymentSchema=new mongoose.Schema({
    creditCardNo:{type:Number,required:true},
    users: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    amount:{type:Number,required:true},
    description:{type:String,required:true}
},{
    timestamps:true
});
const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;