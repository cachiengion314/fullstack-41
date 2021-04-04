const jwt = require(`jsonwebtoken`)
const UserModel = require(`../model/auth/user`)

const isAuth = async (req, res, next) => {
    const authHeaders = req.headers.auth
    console.log(`authHeaders`, authHeaders)
    try {
        if (!authHeaders) {
            throw new Error(`empty token`)
        }
        const decodeToken = jwt.verify(authHeaders, process.env.PRIVATE_KEY)
        const { userId } = decodeToken
        const existUser = await UserModel.findById(userId)
        // assign varibles for request
        if (!existUser) {
            throw new Error("not existed user")
        }
        req.user = existUser
        next()
    } catch (err) {
        res.status(401).send({ success: 0, messsenger: err })
    }
}

module.exports = {
    isAuth
};