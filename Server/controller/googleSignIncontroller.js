require('dotenv').config()
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')

class googleAuth {
    static googleSignin (req, res, next) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            console.log(">>>>> .then(ticket)",ticket);
            payload = ticket.getPayload();    
                    
            return User.findOne({ where: { email: payload["email"] } })
        })
        .then(user => {
            if (user) {
            console.log(">>>>>>then.user")
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
            let access_token = encode({ id: data.id, email: data.email })

            console.log(">>>>>>>.then(data)")
            return res.status(200).json({ access_token })
        })
        .catch(err => {

            console.log("error catch >>>>>>",err)
            res.status(400).json(err)
        })
    }
}

module.exports = googleAuth