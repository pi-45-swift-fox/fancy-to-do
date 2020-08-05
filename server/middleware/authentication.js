const jwt = require('jsonwebtoken')
const { User } = require('../models')
function authentication(req, res, next) {
    // console.log(req.headers);

    if(!req.headers.accesstoken){
        return res.status(500).json({
            msg: 'Not Authenticated'
        })
    }

    try {
        const userToken = jwt.verify(
            req.headers.accesstoken,
            process.env.JWT_SECRET
        )
        User.findOne({
            where: {
                username: userToken.username
            }
        })
        .then(user => {
            if (!user) {
                res.status(500).json({
                    msg: 'Not Authenticated'
                })
            } else {
                req.userLogin = user

                next()
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Not Authenticated'
        })
    }
}

module.exports = authentication