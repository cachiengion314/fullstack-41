const mongoose = require(`mongoose`);

let schema = new mongoose.Schema({
    frontside: {
        type: String,
        required: true
    },
    backside: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["code", "vocal", "other"],
        default: "other"
    },
    memory: {
        type: Boolean,
        required: true,
        default: false
    }
})

const FlashCardDb = mongoose.model(`flashcarddb`, schema);

module.exports = FlashCardDb;