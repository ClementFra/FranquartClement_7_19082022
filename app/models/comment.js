const mongoose = require('mongoose');
const Post = require("../models/post");
const User = require("../models/user");

// Setting schema for comment

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    postId: {
        type: String,
        ref: "Post",
        required: true
    },
    message: {
        type: String,
        trim: true,
        maxlength: 500
    },
    likes: {
        type: Number
    },
    usersLiked: [{
        type: String,
        ref: "User"
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema);