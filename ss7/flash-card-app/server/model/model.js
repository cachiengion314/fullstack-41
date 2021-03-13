const mongoose = require(`mongoose`);

let schema = new mongoose.Schema({
    frontside: {
        type: String,
        require: true
    },
    backside: {
        type: String,
        require: true,
    },
    category: String,
    memory: {
        type: Boolean,
        require: true,
    }
})

const FlashCardDb = mongoose.model(`flashcarddb`, schema);

module.exports = FlashCardDb;