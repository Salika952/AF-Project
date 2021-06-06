const mongoose=require('mongoose');

const PaperSchema=new mongoose.Schema({
    paper_author:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    paper_content:{type:String},
    paper_contact:{type:Number,required:true},
    paper_sign:{type:String}
});
const Papers = mongoose.model('Papers', PaperSchema);
module.exports = Papers;