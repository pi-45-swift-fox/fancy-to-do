const jwt = require('jsonwebtoken')

function generateToken(user){
    return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
}

function verifyToken(user){
    return jwt.verify(user, process.env.JWT_SECRET)
}

module.exports = {generateToken, verifyToken}