const mongoose=require('mongoose');

const ProposalSchema=new mongoose.Schema({
    propo_author:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    propo_content:{type:String},
    propo_contact:{type:Number,required:true},
    propo_sign:{type:String},
    propo_validation:{ type: Boolean, default: false },
    propo_pres: {
        type: String,

    },
});
const Proposal = mongoose.model('Proposals', ProposalSchema);
module.exports = Proposal;
    
