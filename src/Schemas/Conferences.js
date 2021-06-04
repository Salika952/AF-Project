const mongoose=require('mongoose');

const ConferenceSchema=new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    theme:{type:String, required:true, trim:true},
    venue:{type:String, required:true, trim:true},
    date:{type:Date, required:true},
    researchList:[{type: mongoose.Schema.Types.ObjectId, required: false, ref: 'ResearchEvent'}],
    workshopList:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'WorkshopEvent'}],
    attendees: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    amount:{type:Number, required:true}
});
const Conferences = mongoose.model('Conferences', ConferenceSchema);
module.exports = Conferences;