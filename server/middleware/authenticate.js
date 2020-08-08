const { User } = require('../models')
const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    if (!req.headers.accesstoken) {
        console.log('sini');
        // console.log(req.headers);
        return next({ errorCode: 'INVALID_ACCOUNT' })
            // res.status(500).json({ message: 'Not authenticate' })
    }
    try {
        // console.log(req.headers);
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
                // console.log(user);
                // console.log(user);
                if (!user) return next({ errorCode: 'INVALID_ACCOUNT' })
                    //  res.status(500).json({ message: 'Not authenticate' })
                req.login = user
                next()
            })


    } catch (err) {
        console.log(err);
        next(err)
            // res.status(500).json(err)
    }

}


module.exports = authenticate