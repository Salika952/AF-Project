const mongoose=require('mongoose');

const PaperSchema=new mongoose.Schema({
    author:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    content:{type:String},
    contact:{type:Number,required:true}
});
const Papers = mongoose.model('Papers', PaperSchema);
module.exports = Papers;