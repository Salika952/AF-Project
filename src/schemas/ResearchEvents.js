const mongoose=require('mongoose');

const ResearchSchema=new mongoose.Schema({
    res_presenters:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    res_papers:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Papers'}],
    res_presenterFee:{type:Number, required:true},
    res_topic:{type:String,required:true, trim:true },
},{
    timestamps:true
});

const ResearchEvent = mongoose.model('ResearchEvent', ResearchSchema);
module.exports = ResearchEvent;