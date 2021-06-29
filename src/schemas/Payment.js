const mongoose=require('mongoose');

const PaymentSchema=new mongoose.Schema({
    pay_creditCardNo:{type:Number,required:true},
    pay_users: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'},
    pay_paper: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Papers'},
    pay_amount:{type:Number,required:true},
    pay_description:{type:String,required:true},
    pay_email:{type:String,required:true},
    pay_validation:{ type: Boolean, default: false },
    pay_note:{ type: String}
},{
    timestamps:true
});
const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;