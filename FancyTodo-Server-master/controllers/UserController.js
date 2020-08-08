const { User } = require('../models/index')

const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { verify } = require('../helpers/googleOauth')
const { sendEmail } = require('../helpers/mailgun')

class UserController {
    static login(req, res, next) {
        const inputPassword = req.body.password
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            const databasePassword = user ? user.password : ''
            if(!user) {
                next({
                    name: 'ValidationError',
                    errors: 'invalid username/password'
                })
            }else if (!comparePassword(inputPassword, databasePassword)) {
                next({
                    name: 'ValidationError',
                    errors: 'invalid username/password'
                })
            } else {
                const payload = {
                    email: user.email
                }
                const token = signToken(payload)
                res.status(200).json({
                    token
                })
            }
        }).catch(err => {
            next(err)
        })
    }
    static async register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthOfDate: req.body.birthOfDate
        }
        try {
            const user = await User.create(newUser)
            const payload = {
                email: user.email
            }
            const token = signToken(payload)
            sendEmail(user.email, `Thank you, for choosing us!`)
            res.status(201).json({
                token
            })
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: 'ValidationError',
                    errors: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }
    static async oauthGoogle(req, res) {
        const google_token = req.headers.google_token
        
        try {
            const payload = await verify(google_token)
            const user = await User.findOne({where: {
                email: payload.email
            }})
            const newPayload = {
                email: payload.email
            }
            if (!user) {
                const newUser = {
                    email: payload.email,
                    password: process.env.DEFAULT_GOOGLEPASS,
                    firstname: payload.given_name,
                    lastname: payload.family_name,
                    birthOfDate: new Date()
                }
                const createUser = await User.create(newUser)
                sendEmail(createUser.email, `Thank you , for choosing us!`)
                
                const token = signToken(newPayload)
                res.status(201).json({
                    token
                })
            } else {
                const token = signToken(newPayload)
                res.status(200).json({
                    token
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = UserController