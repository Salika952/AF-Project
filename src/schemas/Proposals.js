const mongoose=require('mongoose');

const ProposalSchema=new mongoose.Schema({
    author:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    content:{type:String},
    contact:{type:Number,required:true}
});
const Proposal = mongoose.model('Proposal', ProposalSchema);
module.exports = Proposal;