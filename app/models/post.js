const mongoose = require('mongoose');

//Setting schema for post

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        trim: true,
        maxlength: 500
    },
    imageUrl: {
        type: String
    },
    likes: {
        type: Number,
        default:0
        },
    usersLiked: [{
        type: String,
        ref: "User"
    }],
    comments: [{
        type: String,
        ref: "Comment"
    }],
}, {
     timestamps: true
})
module.exports = mongoose.model("Post", postSchema);