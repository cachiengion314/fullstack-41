const UserModel = require(`../../model/auth/user`);
const bcrypt = require(`bcryptjs`);

const createUser = async ({ email, password }) => {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
        throw new Error(`Existed user!`);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPasswrod = bcrypt.hashSync(password, salt);
    const newUser = await UserModel.create({ email, password: hashPasswrod });
    return newUser;
}

const login = async ({ email, password }) => {
    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
        throw new Error(`not existed user!`);
    }
    const hashPasswrod = existedUser.password;
    const comparePassword = bcrypt.compareSync(password, hashPasswrod);
    if (!comparePassword) {
        throw new Error(`Password is wrong!`);
    }
    return existedUser;
}

module.exports = {
    createUser, login
}