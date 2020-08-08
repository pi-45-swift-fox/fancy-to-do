const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class Helper {
    static encoder(password) {
        return bcrypt.hashSync(password, +process.env.BCRYPT_SALT)
    }

    static decoder(password, encodedPassword) {
        return bcrypt.compareSync(password, encodedPassword)
    }

    static tokenGenerator(obj) {
        return jwt.sign(obj, process.env.JWT_SECRET_KEY)
    }

    static tokenVerifier(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
}

module.exports = Helper
