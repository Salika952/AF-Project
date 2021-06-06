const mongoose=require('mongoose');

const WorkshopSchema=new mongoose.Schema({
    work_conductors:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    work_proposal:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Proposal'}],
    work_topic:{type:String,required:true, trim:true },

},{
    timestamps:true
});

const WorkshopEvent = mongoose.model('WorkshopEvent', WorkshopSchema);
module.exports = WorkshopEvent;