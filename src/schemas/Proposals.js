const mongoose=require('mongoose');

const ProposalSchema=new mongoose.Schema({
    propo_author:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    propo_content:{type:String},
    propo_contact:{type:Number,required:true},
    propo_sign:{type:String}
});
const Proposal = mongoose.model('Proposal', ProposalSchema);
module.exports = Proposal;