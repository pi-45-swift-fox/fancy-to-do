const { User } = require('../models')
const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    if (!req.headers.accesstoken) {
        return res.status(500).json({ message: 'Not authenticate' })
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
                if (!user) return res.status(500).json({ message: 'Not authenticate' })
                req.login = user
                next()
            })

    } catch (err) {
        // console.log(err);
        return res.status(500).json({ message: 'Not authenticate' })
    }

}


module.exports = authenticate