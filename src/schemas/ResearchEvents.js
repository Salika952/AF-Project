const mongoose=require('mongoose');

const ResearchSchema=new mongoose.Schema({
    res_presenterFee:{type:Number, required:true},
    res_topic:{type:String,required:true, trim:true },
    res_validation:{ type: Boolean, default: false },
    res_description:{type:String,required:true, trim:true},
    res_presenters:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    res_papers:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Papers'}],
    res_img:{type:String},
    res_AdminStatus:{type:String, default: 'New',  trim:true},
    res_conferenceName:{type:String, trim:true},
},{
    timestamps:true
});

const ResearchEvent = mongoose.model('ResearchEvent', ResearchSchema);
module.exports = ResearchEvent;