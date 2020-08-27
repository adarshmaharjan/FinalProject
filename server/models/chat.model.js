const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default: 'not answered yet',
    },
    isAnswered: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
