const mongoose=require('mongoose');

const WorkshopSchema=new mongoose.Schema({
    conductors:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    proposal:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Proposal'}],
    topic:{type:String,required:true, trim:true },

},{
    timestamps:true
});

const WorkshopEvent = mongoose.model('ResearchEvent', WorkshopSchema);
module.exports = WorkshopEvent;