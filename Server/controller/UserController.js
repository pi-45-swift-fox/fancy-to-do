const {User} = require('../models')
const {decode} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const axios = require('axios')
const verifyGoogle = require('../helpers/verifyGoogleToken')

class UserController{
    static async register(req, res, next){
        try{
            const { email , password } = req.body 
            const newData = await User.create({email,password})
            res.status(201).json({id: newData.id, email: newData.email})
            
        }
        catch(error){
            next(error)
        }
    }
    
    static async login(req, res, next){
        try {
            const {email, password} = req.body
            const user = await User.findOne({where:{email}})
            
            if(!user){
                return next({errorCode : 'INVALID_USER'})
            }

            const checkPassword = decode(password, user.password)
            if(!checkPassword){
                return next({errorCode : 'INVALID_USER'})
            }
                
            const token = generateToken(user)
            res.status(200).json({id: user.id,email: user.email ,token})
        
        } catch (error){
            next(error)
        }
    }

    static async getNews(req, res, next) {
        try {
            console.log(req.userLogin.id)
            const result = await axios({
            method: 'get',
            url: 'https://content.guardianapis.com/search',
            headers: {
                "api-key": '17eaacc7-e89e-430e-826f-8f604853c397'
            },
            params: {
                "q": req.userLogin.title,
                "show-fields" : "all" 
            }
            })

            let news = result.data.response.results;

            res.status(200).json({
            news
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async googleLogin(req, res, next){
        try{
            const google_token = req.headers.google_token
            const payload = await verifyGoogle(google_token)            
            const email = payload.email
            const user = await User.findOne({where: {email}})
            const password = process.env.GOOGLE_DEFAULT_PASSWORD

            if(user){
                let check = decode(password, user.password)
                if(check){
                    const token = generateToken(user)
                    res.status(200).json({
                        id: user.id,email: user.email ,token
                    })
                }

            }else{
                const newUser = await User.create({email,password})
                const token = generateToken(newUser)
                req.status(200).json({
                    id: user.id,email: user.email ,token
                })
            }
            
        }catch(err){
            next(err)
        }
    }
}

module.exports = UserController