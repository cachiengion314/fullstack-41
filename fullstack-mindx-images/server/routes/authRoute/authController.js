const UserModel = require(`../../model/auth/user`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`)

const createUser = async ({ email, password }) => {

    const existedUser = await UserModel.findOne({ email })
    if (existedUser) {
        throw new Error(`Existed user!`);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPasswrod = bcrypt.hashSync(password, salt);
    const newUser = await UserModel.create({ email, password: hashPasswrod })
    return newUser
}

const login = async ({ email, password }) => {
    const existedUser = await UserModel.findOne({ email }) // .lean() => convert to normal obj || query mongoose
    if (!existedUser) {
        throw new Error(`not existed user!`);
    }
    const hashPasswrod = existedUser.password;
    const comparePassword = bcrypt.compareSync(password, hashPasswrod)

    if (!comparePassword) {
        throw new Error(`Password is wrong!`);
    }

    // encrypt user info

    const data = { userId: existedUser._id }
    // func jwt.sign() create a obj
    const token = jwt.sign(
        data,
        process.env.PRIVATE_KEY,
        { expiresIn: process.env.EXPIRE_TIME }
    )
    console.log(`token`, token)
    return { ...existedUser, token }
}


module.exports = {
    createUser, login
}