const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static register(req, res, next) {
        const encryptPass = bcrypt.hashSync(req.body.password, 10)
        let user = {
            email: req.body.email,
            password: encryptPass
        }
        User.create(user)
            .then(data => res.status(201).json(data))
            .catch(err => next(err))
    }

    static login(req,res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if(!user) {
                    next({errorCode: 'NOT_FOUND_USER', message: 'username or password is incorrect'})
                } else {
                    const verified = bcrypt.compareSync(req.body.password, user.password)
                    if(verified) {
                        const token = jwt.sign({id: user.id, email: user.email, }, process.env.SECRET)
                        res.status(200).json({user, token})
                    } else {
                        next({errorCode: 'NOT_FOUND_USER', message: 'username or password is incorrect'})
                    }
                }
            })
            .catch (err => next(err))
    }

    static show(req, res, next) {
        User.findAll()
            .then(user => res.status(200).json(user))
            .catch(err => next(err))
    }
}

module.exports = UserController