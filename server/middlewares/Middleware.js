const Helper = require('../helpers/Helper')
const {User} = require('../models')

class Middleware {
    static authentication(req, res, next) {
        if (!req.headers.access_token) {
            next({errorCode: 'ERROR_AUTHENTICATION'})   
        } else {
            try {
                const userData = Helper.tokenVerifier(req.headers.access_token)
    
                User.findOne({
                    where: {
                        email: userData.email
                    }
                })
                .then(user=>{
                    if (!user) {
                        next({errorCode: 'ERROR_AUTHENTICATION'})                        
                    } else {
                        req.userLogin = user
                        
                        next()
                    }
                })
            }
            catch(err) {
                next(err)
            }
        }
    }

    // static authorization(req, res, next) {

    // }
}

module.exports = Middleware
