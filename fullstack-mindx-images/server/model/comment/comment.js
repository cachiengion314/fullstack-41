const mongoose = require(`mongoose`);
const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId, // postId
        ref: "post"
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId, // userId
        ref: "user"
    },
}, { timestamps: true });

module.exports = mongoose.model(`comment`, CommentSchema);