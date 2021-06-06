const mongoose=require('mongoose');

const ConferenceSchema=new mongoose.Schema({
    con_name:{type:String, required:true, trim:true},
    con_theme:{type:String, required:true, trim:true},
    con_venue:{type:String, required:true, trim:true},
    con_date:{type:Date, required:true},
    con_researchList:[{type: mongoose.Schema.Types.ObjectId, required: false, ref: 'ResearchEvent'}],
    con_workshopList:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'WorkshopEvent'}],
    con_attendees: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    con_amount:{type:Number, required:true}
});
const Conferences = mongoose.model('Conferences', ConferenceSchema);
module.exports = Conferences;