const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  //specifies the name of the referenced model 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        get: (date) => date.toDateString(),    // Format date as a string using toDateString
    },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
