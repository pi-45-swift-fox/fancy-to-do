const {Todo} = require('../models') 
function authorize(req, res, next){
    // console.log(req.userLogin.role)
    Todo.findByPk(req.params.id)
    // console.log(req.userLogin.id, 'INI ID USER LOGIN')
    .then(data=>{
        console.log(data.UserId)
        if(req.userLogin.id == data.UserId){
            next()
        }else{
            next('FORBIDDEN_REQUEST')
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = authorize