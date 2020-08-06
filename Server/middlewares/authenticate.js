const jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports = function authenticate(req, res, next){
    if(!req.headers.access_token){
        return next('NOT_AUTHENTICATED')
    }else{
        try{
            const user = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
            User.findByPk(user.id)
            .then(data=>{
                if(!data){
                    return next({errorCode: 'NOT_AUTHENTICATED'})
                }else{
                    req.userLogin = data
                    next()
                }
            })
        }catch(err){
            return next(err)
        }
    }
}