const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static register(req, res) {
        const encryptPass = bcrypt.hashSync(req.body.password, 10)
        let obj = {
            email: req.body.email,
            password: encryptPass
        }
        User.create(obj)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(400).json(err))
    }

    static login(req,res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if(!user) return res.status(400).json({message: 'username or password is incorrect'})
                const verified = bcrypt.compareSync(req.body.password, user.password)
                if(verified) {
                    const token = jwt.sign({id: user.id, email: user.email, }, process.env.SECRET)
                    res.status(200).json({user, token})
                } else {
                    res.status(400).json({message: 'username or password is incorrect'})
                }
            })
            .catch (err => res.status(500).json(err))
    }

    static show(req, res) {
        User.findAll()
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json(err))
    }
}

module.exports = UserController