const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  encode(params) {
    return jwt.sign(params, secret)
  },
  decode(token) {
    return jwt.verify(token, secret)
  }
}
