const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {email: email}
        })
            .then(user => {
                if (user) {
                    let decrypted = compare(req.body.password, user.password)
                    if (decrypted) {
                        let userData = {
                            id: user.id,
                            email: user.email
                        }
                        let access_token = generateToken(userData)
                        return res.status(200).json({access_token: access_token, email: user.email})
                    } else {
                        throw {
                            name: "BadRequest",
                            message: "Invalid email or password",
                            status: 401
                        }
                    }
                } else {
                    throw {
                        message: 'User Doesnt Exist',
                        status: 404,
                        name: 'NotFound'
                    }
                }
            })
            .catch(err => {
                next (err)
            })
    }
    static register (req, res, next) {
        const { email, password } = req.body
        User.create ({
            email,
            password
        })
            .then(newUser => {
                const userData = {
                    id: newUser.id,
                    email: newUser.email
                }
                let access_token = generateToken(userData)
                return res.status(201).json({email: newUser.email, access_token: access_token})
            })
            .catch(err => {
                console.log(err);
                next (err)
            })
    }
    static googleLogin (req, res, next) {
        console.log("masuklbro")
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then( ticket => {
            payload = ticket.getPayload();
            const userid = payload['sub']
            console.log(payload, ">>>> DATA DARI GOOGLE")
            return User.findOne({ where : { email : payload["email"]}})
        })
        .then( user => {
            console.log(user,"useruser")
            if(user){
                return user;
            } else {
                let dataUser = {
                    email: payload['email'],
                    password: 'admin',
                }
                return User.create(dataUser)
            }
        })
        .then(data => {
            console.log(data,"datadata")
            const access_token = generateToken({
                id : data.id,
                email: data.email,
            })
            console.log(access_token,"accesstoken")
            return res.status(200).json({access_token, id : data.dataValues.id})
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = UserController