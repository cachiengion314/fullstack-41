const express = require(`express`);
const router = express.Router();
const authController = require(`./authController`);

router.post(`/signup`, async (request, response) => {
    let newUser;
    try {
        const { email, password } = request.body;
        newUser = await authController.createUser({ email, password });
    } catch (err) {
        response.status(500).send({ success: 0, messenger: err });
        return;
    }
    response.send({ success: 1, data: newUser });
});
router.post(`/login`, async (request, response) => {
    let foundUser;
    try {
        const { email, password } = request.body;
        foundUser = await authController.login({ email, password });
    } catch (err) {
        response.status(500).send({ success: 0, messenger: err });
        return;
    }
    response.send({ success: 1, data: foundUser });
});

module.exports = router;