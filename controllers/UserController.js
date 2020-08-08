const {User} = require('../models')
const Helper = require('../helpers/Helper')

class UserController {
    static async register(req, res, next) {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(user)
            res.status(201).json(data)
        }
        catch(err) {
            next(err)
        }
    }

    static async logIn(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user == null) {
                next({errorCode: 'LOGIN_ERROR'})
            } else {
                const verified = Helper.decoder(req.body.password, user.password)
                if (verified) {
                    const accessToken = Helper.tokenGenerator({id: user.id, email: user.email})
                    res.status(200).json({accessToken})
                } else {
                    next({errorCode: 'LOGIN_ERROR'})
                }
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = UserController
