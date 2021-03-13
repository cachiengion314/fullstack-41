const FlashCardDb = require(`../model/model`);

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
exports.find = (request, response) => {
    const { id, category } = request.query;

    if (category) {
        FlashCardDb.aggregate(
            [
                { $match: { "category": category } },
                { $sample: { size: 1 } }
            ]
        )
            .then(data => {
                if (!data) {
                    response.status(404).send({ messenger: `not found user with id: ${id}` })
                } else {
                    console.log(`found in category:`, data)
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
                    response.status(404).send({ messenger: `not found user with id: ${id}` })
                } else {
                    response.send(data);
                }
            })
            .catch(err => {
                response.status(500).send({ messenger: err });
            })
        return;
    }
    if (!id) {
        FlashCardDb.aggregate().sample(1)
            .then(data => {
                response.send(data);
            })
            .catch(err => {
                response.status(500).send({ messenger: err });
            })
        return;
    }
}
exports.update = (request, response) => {
    if (!request.body) {
        response.status(404).send({ messenger: "content cannot be empty!" });
        return;
    }
    const { id } = request.params;
    FlashCardDb.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                response.status(404).send({ messenger: `may be user with ${id} not found!` });
            } else {
                response.send(data);
            }
        })
}
exports.delete = (request, response) => {

}