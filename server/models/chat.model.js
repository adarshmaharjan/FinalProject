const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
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
    },
    answer: {
        type: String,
    },
    isAnswered: {
        type: Boolean,
        default: false,
    },
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;
