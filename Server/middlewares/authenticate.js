const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')
function authenticate(req, res, next){
    try{
        if(!req.headers.access_token){
        return next({errorCode : "INVALID_TOKEN"})
        }
        
        const checkToken = verifyToken(req.headers.access_token)
        if(checkToken){
            req.userLogin = checkToken
            next()    
        }

    }catch( error ){
            next( {errorCode: "INVALID_TOKEN"} )
    }
}

module.exports = authenticate