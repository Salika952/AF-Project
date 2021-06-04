const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    reply: {
        type: String,
        trim: true
    },
},{
    timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;