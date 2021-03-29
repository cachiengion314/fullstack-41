const mongoose = require(`mongoose`);
const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId, // postId
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId, // userId
    },
}, { timestamps: true });

module.exports = UserSchema.model(`comment`, CommentSchema);