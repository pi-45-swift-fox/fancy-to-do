const {User, Todo} = require('../models')

class Controller{
    static async register(req, res, next){
        try{
            const newUser = {
                email: req.body.email,
                password : req.body.password,
                role : req.body.role
            }
            console.log(newUser)
            const data = await User.create(newUser)
            console.log(User.email)
            if(!User.email){
                next()
            }else{
                res.status(201).json({message:`${data.username} is created and its role is ${data.role}`})
            }
        }
        catch(err){
            next(err)
        }
    }

    static async login(req, res, next){

    }
}

module.exports = Controller