const jwt = require('jsonwebtoken')

function generateToken(user){
    return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
}

function verifyToken(headers){
    return jwt.verify(headers, process.env.JWT_SECRET)
}

module.exports = {generateToken, verifyToken}