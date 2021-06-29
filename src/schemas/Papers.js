const mongoose=require('mongoose');

const PaperSchema=new mongoose.Schema({
    paper_author:{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'},
    paper_content:{type:String},
    paper_contact:{type:Number},
    paper_mail:{type:String},
    paper_validation:{ type: Boolean, default: false },
    paper_Note:{ type: String },
    paper_event:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'ResearchEvent'}],
    pdf: {
        type: String,

    },
});
const Papers = mongoose.model('Papers', PaperSchema);
module.exports = Papers;