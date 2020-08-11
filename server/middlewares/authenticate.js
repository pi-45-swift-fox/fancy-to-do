const jwt = require('jsonwebtoken')
const { User } = require('../models')

function authenticate(req, res, next) {
    if(!req.headers.accesstoken) {
        return next({errorCode: 'INVALID_ACCOUNT', message: 'Not Authorized'})
    }
    try {
        const userToken = jwt.verify(req.headers.accesstoken, process.env.SECRET)
        User.findOne({
            where: {email: userToken.email}
        })
            .then(user => {
                if(!user) {
                    next({errorCode: 'INVALID_ACCOUNT', message: 'Not Authorized'})
                } else {
                    req.user = user.dataValues
                    next()
                }
            })

    } catch (err) {
        next({errorCode: 'INVALID_ACCOUNT', message: 'Not Authorized'})
    }
}

module.exports = authenticate