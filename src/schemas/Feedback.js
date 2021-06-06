const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({

    feed_name: {
        type: String,
        required: true,
        trim: true
    },
    feed_email: {
        type: String,
        required: true,
        trim: true
    },
    feed_rating: {
        type: Number,
        required: true
    },
    feed_comment: {
        type: String,
        required: true,
        trim: true
    },
    feed_reply: {
        type: String,
        trim: true
    },
},{
    timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;