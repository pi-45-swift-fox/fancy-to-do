const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = {
    verifyToken: token => {
        return new Promise((resolve, reject)=> {
            async function verify() {
                const ticket = await client.verifyToken({
                    idToken: token,
                    audience: process.env.CLIENT_ID
                })
                const payload = ticket.getPayload()
                resolve(payload)
            }
            verify().catch(console.error)
        })
    }
}