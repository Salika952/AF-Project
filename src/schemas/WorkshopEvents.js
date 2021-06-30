
const mongoose=require('mongoose');

const WorkshopSchema=new mongoose.Schema({
        work_conductors:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
        work_proposal:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Proposals'}],
        work_topic:{type:String,required:true, trim:true },
        work_description:{type:String,required:true, trim:true },
        work_place:{type:String,required:false, trim:true },
        work_validation:{ type: Boolean, default: false },
        work_image: {
                type: String,

        },
        work_template: {
                type: String,
        },

},{
        timestamps:true
});

const WorkshopEvent = mongoose.model('WorkshopEvent', WorkshopSchema);
module.exports = WorkshopEvent;
