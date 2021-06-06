const mongoose=require('mongoose');

const PaymentSchema=new mongoose.Schema({
    pay_creditCardNo:{type:Number,required:true},
    pay_users: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    pay_amount:{type:Number,required:true},
    pay_description:{type:String,required:true}
},{
    timestamps:true
});
const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;