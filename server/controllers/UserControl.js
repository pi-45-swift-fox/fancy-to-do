const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifiyGoogle = require('../helpers/verifiyGoogleToken')

class UserController {
    static register(req, res, next) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(user)
            .then(data => res.status(201).json(data))
            .catch(err => next(err))
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if(!user) {
                    next({errorCode: 'NOT_FOUND_USER', message: 'email or password is incorrect'})
                } else {
                    const verified = bcrypt.compareSync(req.body.password, user.password)
                    if(verified) {
                        const token = jwt.sign({id: user.id, email: user.email, }, process.env.SECRET)
                        res.status(200).json({user, token})
                    } else {
                        next({errorCode: 'NOT_FOUND_USER', message: 'email or password is incorrect'})
                    }
                }
            })
            .catch(err => next(err))
    }

    static show(req, res, next) {
        User.findAll()
            .then(user => res.status(200).json(user))
            .catch(err => next(err))
    }

    static async googleLogin(req, res, next) {
        const google_token = req.headers.google_token

        try {
            const payload = await verifiyGoogle(google_token)
            const email = payload.email
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const password = process.env.DEFAULT_GOOGLE_PASSWORD
            if(user) {
                let check = bcrypt.compareSync(password, user.password)
                if(check) {
                    const token = jwt.sign({id: user.id, email: user.email, }, process.env.SECRET)
                    res.status(200).json({user, token})
                } else {
                    
                }
            } else {
                const newUser = await User.create({
                    email,
                    password
                })
                const token = jwt.sign({id: newUser.id, email: newUser.email, }, process.env.SECRET)
                res.status(200).json({token})
                // console.log({token});
                
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = UserController