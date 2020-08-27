const { User } = require('../models')
const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    if (!req.headers.accesstoken) {
        return next({ errorCode: 'INVALID_ACCOUNT' })
    }
    try {
        const userToken = jwt.verify(
            req.headers.accesstoken,
            process.env.JWT_SECRET
        )
        User.findOne({
                where: {
                    email: userToken.email
                }
            })
            .then(user => {
                if (!user) return next({ errorCode: 'INVALID_ACCOUNT' })
                req.login = user
                next()
            })


    } catch (err) {
        console.log(err);
        next(err)
    }

}


module.exports = authenticate