const FlashCardDb = require(`../model/model`);
const mongoose = require(`mongoose`);
const ObjectId = mongoose.Types.ObjectId;

exports.create = (request, response) => {
    if (!request.body) {
        response.status(404).send({ messenger: "content cannot be empty!" });
        return;
    }
    const { frontside, backside, category } = request.body;
    const flashcard = new FlashCardDb({
        frontside, backside, category
    });
    flashcard
        .save(flashcard)
        .then((data) => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                messenger: err
            })
        })
}

let unduplicateeFind = (request, response) => {
    const { ex_id, id, category } = request.query;

    if (category && ex_id) {
        FlashCardDb.aggregate(
            [
                { $match: { "category": category, "_id": { $not: { $eq: ObjectId(ex_id) } } } },
                { $sample: { size: 1 } }
            ]
        )
            .then(data => {
                if (!data) {
                    response.status(404).send({ messenger: `not found card with id: ${id}` })
                } else {
                    console.log(`found unduplicatee item in category:`, data)

                    response.send(data);
                }
            })
            .catch(err => {
                response.status(500).send({ messenger: err });
            })
        return;
    }

    if (ex_id) {
        FlashCardDb.aggregate(
            [
                { $match: { "_id": { $not: { $eq: ObjectId(ex_id) } } } },
                { $sample: { size: 1 } }
            ]
        )
            .then(data => {
                if (!data) {
                    response.status(404).send({ messenger: `not found card with id: ${id}` })
                } else {
                    console.log(`found unduplicatee item:`, data)

                    response.send(data);
                }
            })
            .catch(err => {
                response.status(500).send({ messenger: err });
            })
        return;
    }

    if (id) {
        FlashCardDb.findById(id)
            .then(data => {
                if (!data) {
                    response.status(404).send({ messenger: `not found card with id: ${id}` })
                } else {
                    response.send(data);
                }
            })
            .catch(err => {
                response.status(500).send({ messenger: err });
            })
        return;
    }
    // if everything are undefined
    FlashCardDb.aggregate().sample(1)
        .then(data => {
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({ messenger: err });
        })
}
exports.find = unduplicateeFind;

exports.update = (request, response) => {
    if (!request.body) {
        response.status(404).send({ messenger: "content cannot be empty!" });
        return;
    }
    const { id } = request.params;
    FlashCardDb.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                response.status(404).send({ messenger: `may be card with ${id} not found!` });
            } else {
                response.send(data);
            }
        })
}
exports.delete = (request, response) => {

}