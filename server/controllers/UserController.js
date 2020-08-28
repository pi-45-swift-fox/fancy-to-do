const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyGoogle = require('../helpers/verifyGoogleToken')

class UserController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            if(email){
                const checkSameEmail = await User.findOne({
                    where: {
                        email
                    }
                })
                if (!checkSameEmail) {
                    const newUser = await User.create({
                        email,
                        password
                    })
                    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET);
                    res.status(201).json({ token })
                } else {
                    next({ errorCode: 'DUPLICATE_EMAIL', message: 'Your email is already used. Please login or sign up with a new email' })
                }
            } else{
                next({errorCode:'INVALID_ACCOUNT', msg:'Please input email and password'})
            }
        } catch (err) {
            next(err);
        }

    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const check = await User.findOne({
                where: {
                    email
                }
            })
            if (!check) {
                next({ errorCode: 'INVALID_ACCOUNT' })
                    // res.status(400).json('invalid email or password')
            } else {
                const result = bcrypt.compareSync(password, check.password)
                if (!result) {
                    next({ errorCode: 'INVALID_ACCOUNT' })
                        // res.status(400).json('invalid email or password')
                } else if (result) {
                    const token = jwt.sign({ id: check.id, email: check.email }, process.env.JWT_SECRET);
                    res.status(200).json({ token })
                }
            }
        } catch (err) {
            next({ errorCode: 'INVALID_ACCOUNT' })
                // res.status(400).json('invalid email or password')
        }
    }

    static async googleLogin(req, res, next) {
        const google_token = req.headers.google_token
        try {
            const payLoad = await verifyGoogle(google_token)
            const email = payLoad.email
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const password = process.env.DEFAULT_GOOGLE_USER_PASSWORD
            if (user) {
                // const checkPasswordGoogleUser = bcrypt.hashSync(password,user.password)
                const encryptedPassword = bcrypt.hashSync(password, 10)
                const newPasswordGoogleUser = await User.update({ password: encryptedPassword }, {
                    where: {
                        id: user.id
                    }
                })
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
                res.status(200).json({ token })
            } else {
                const newUserGoogle = await User.create({
                    email,
                    password: password
                })
                const token = jwt.sign({ id: newUserGoogle.id, email: newUserGoogle.email }, process.env.JWT_SECRET);
                res.status(201).json({ token })
            }
        } catch (err) {
            console.log(err);
            next(err)
        }

    }

}

module.exports = UserController