const mongoose=require('mongoose');

const ResearchSchema=new mongoose.Schema({
    presenters:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    papers:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Papers'}],
    presenterFee:{type:Number, required:true},
    topic:{type:String,required:true, trim:true },
},{
    timestamps:true
});

const ResearchEvent = mongoose.model('ResearchEvent', ResearchSchema);
module.exports = ResearchEvent;