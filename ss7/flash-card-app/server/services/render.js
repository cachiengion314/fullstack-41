const FlashCardDb = require(`../model/model`);
const axios = require(`axios`);

// "/"
exports.homeRoutes = async (request, response) => {
    const { ex_id, id, category } = request.query;

    if (category && ex_id) {
        axios.get(`http://localhost:4000/api/flash-card?category=${category}&ex_id=${ex_id}`)
            .then(axiosRes => {
                console.log(`homeRoutes category and ex_id axiosRes.data`, axiosRes.data)
                response.render(`index`, { randomCard: axiosRes.data[0] });
            })
            .catch(err => {
                if (err) {
                    response.send({ messenger: err });
                }
            })
        return;
    }

    if (ex_id) {
        axios.get(`http://localhost:4000/api/flash-card?ex_id=${ex_id}`)
            .then(axiosRes => {
                console.log(`homeRoutes ex_id axiosRes.data`, axiosRes.data)
                response.render(`index`, { randomCard: axiosRes.data[0] });
            })
            .catch(err => {
                if (err) {
                    response.send({ messenger: err });
                }
            })
        return;
    }

    if (id) {
        axios.get(`http://localhost:4000/api/flash-card?id=${id}`)
            .then(axiosRes => {
                console.log(`homeRoutes specify id axiosRes.data`, axiosRes.data)
                response.render(`index`, { randomCard: axiosRes.data });
            })
            .catch(err => {
                if (err) {
                    response.send({ messenger: err });
                }
            })
        return;
    }

    // if everything are undefined
    axios.get(`http://localhost:4000/api/flash-card`)
        .then(axiosRes => {
            console.log(`homeRoutes randomid axiosRes.data`, axiosRes.data)
            response.render(`index`, { randomCard: axiosRes.data[0] });
        })
        .catch(err => {
            if (err) {
                response.send({ messenger: err });
            }
        })
}

// "/edit"
exports.editCard = (request, response) => {
    const { id } = request.query;
    axios.get(`http://localhost:4000/api/flash-card?id=${id}`)
        .then(axiosRes => {
            console.log(`editCard axiosRes.data`, axiosRes.data)
            response.render(`edit-card`, { selectedCard: axiosRes.data });
        })
        .catch(err => {
            if (err) {
                response.send({ messenger: err });
            }
        })
}

// "/create"
exports.addCard = (request, response) => {
    response.render(`add-card`);
}