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
    },
}, { timestamps: true });

module.exports = UserSchema.model(`post`, PostSchema);