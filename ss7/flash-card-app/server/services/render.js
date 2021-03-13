// const UserDb = require(`../model/model`);
const axios = require(`axios`);

exports.homeRoutes = async (request, response) => {
    const { id, category } = request.query;
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
    if (category) {
        axios.get(`http://localhost:4000/api/flash-card?category=${category}`)
            .then(axiosRes => {
                console.log(`homeRoutes category axiosRes.data`, axiosRes.data)
                response.render(`index`, { randomCard: axiosRes.data[0] });
            })
            .catch(err => {
                if (err) {
                    response.send({ messenger: err });
                }
            })
        return;
    }
    if (!category || !id) {
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
        return;
    }

}
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
exports.addCard = (request, response) => {
    response.render(`add-card`);
}