const express = require(`express`);
const router = express.Router();
const authController = require(`./authController`)
const { isAuth } = require("../../middleware/isAuth")

router.post(`/signup`, async (request, response) => {
    try {
        const { email, password } = request.body
        console.log(`signup1`, email, password)
        let newUser = await authController.createUser({ email, password })
        response.send({ success: 1, data: newUser })
    } catch (err) {
        console.log(`err`, err)
        response.status(500).send({ success: 0, messenger: err })
        return;
    }
})

router.post(`/login`, async (request, response) => {
    try {
        const { email, password } = request.body;
        const foundUser = await authController.login({ email, password })
        response.send({ success: 1, data: foundUser })
    } catch (err) {
        response.status(500).send({ success: 0, messenger: err })
        return;
    }
})

router.get(`/user`, isAuth, async (request, response) => {
    try {
        const user = request.user
        response.send({ success: 1, data: user })
    } catch (err) {
        response.status(500).send({ success: 0, messenger: err });
        return;
    }
})

module.exports = router;