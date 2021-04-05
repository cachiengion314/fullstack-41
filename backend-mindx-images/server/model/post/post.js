const mongoose = require(`mongoose`);
const PostSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true }, // chi nen define khi dung co che virtual field
    toObject: { virtuals: true }
});

PostSchema.virtual(`comments`, { // db khong he co truohg comments
    localField: "_id",
    foreignField: "postId",
    ref: "comment",
})

module.exports = mongoose.model(`post`, PostSchema);