const {User, Todo} = require('../models')

function authorize(req, res, next){
    try{
        Todo.findByPk(req.params.id)
        .then(data=>{
            if(req.userLogin.id == data.userId){
                next()
            }else{
            next({errorCode: "INVALID_AUTHORIZATION"})
            }
        }).catch(error=>{
            return next({errorCode : "INVALID_DATA"})
        })
        
    }catch(error){
        next(error)
    }
}

module.exports = authorize