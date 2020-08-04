const jwt = require('jsonwebtoken')
const { User } = require('../models')

function authenticate(req, res, next) {
    if(!req.headers.accesstoken) {
        return res.status(401).json({message: 'Not Authorized'})
    }
    try {
        const userToken = jwt.verify(req.headers.accesstoken, process.env.SECRET)
        User.findOne({
            where: {email: userToken.email}
        })
            .then(user => {
                if(!user) {
                    res.status(401).json({message: 'Not Authorized'})
                } else {
                    req.userLogin = user
                    next()
                }
            })

    } catch (err) {
        return res.status(401).json({message: 'Not Authorized'})
    }
}

module.exports = authenticate