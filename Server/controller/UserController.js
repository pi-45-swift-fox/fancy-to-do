const {User, Todo} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Controller{
    static async register(req, res, next){
        try{
            // const encryptedPassword = bcrypt.hashSync(req.body.password, 8)
            const newUser = {
                email: req.body.email,
                password : req.body.password,
                role : req.body.role
            }
            // console.log(newUser)
            const data = await User.create(newUser)
            res.status(201).json({message:`data id: ${data.id}, ${data.email} is created and its role is ${data.role}`})
        }
        catch(err){
            next(err)
        }
    }

    static async login(req, res, next){
        try{
            // console.log(req.body)
            const data = await User.findOne({where:
                {email : req.body.email}
            })
            if(!data){
                next({errorCode: 'NOT_FOUND'})
            }else{
                const password = bcrypt.compareSync(req.body.password, data.password)
                console.log(password)
                if(password){
                    const token = jwt.sign({id: data.id, name: data.email, role: data.role}, process.env.JWT_SECRET)
                    // console.log(data.id, data.email, data.role)
                    res.status(200).json({id: data.id, user: data.email, role: data.role, token })
                }else{
                    next({errorCode : 'INCORRECT_USER'})
                }

            }
        }catch(err){
            console.log(err)
            next(err)
        }
    }   
}

module.exports = Controller