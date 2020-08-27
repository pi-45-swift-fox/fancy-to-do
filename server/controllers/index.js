// const HolidayAPI = require('holidayapi')
const {Todo, User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const verifyGoolge = require('../helpers/verifyGoogleToken')

class Controller {
    static async create(req, res, next){
        try {
            const UserId = req.userLogin.id
            const {title, description, status, Due_date} = req.body
            const newCreate = await Todo.create({
                title,
                description,
                status,
                Due_date,
                UserId
            })
            res.status(200).json(newCreate)
        } catch (err) {
            next({name: 'Invalid Request', message: 'Invalid Request'})
        }
        
    }

    static async read(req, res, next){
        try {
            const readAll = await Todo.findAll()
            res.status(200).json(readAll)
        } catch (err) {
            next({name: 'Invalid Request', message: 'Invalid Request'})
        }
    }
    
    static async readById(req, res, next){
        try {
            const readByPk = await Todo.findByPk(+req.params.id)
            res.status(200).json(readByPk)
        } catch (err) {
            next({name: 'Error Not Found', message: 'Error Not Found'})
        }
    }

    static async replace(req, res, next){
        console.log(req.body);
        try {
            const {title, description, status, Due_date} = req.body
            const newReplace = await Todo.update({
                title, description, status,Due_date
            },{
                where:{
                    id: +req.params.id
                }
            })
            res.status(200).json(newReplace)
        } catch (err) {
            next({name: 'Invalid Request', message: 'Invalid Request'})
        }
    }

    static async destroy(req, res, next){
        try {
            const willDelete = await Todo.destroy({
                where:{
                    id: +req.params.id
                } 
            })
            res.status(200).json(willDelete)
        } catch (err) {
            next({name: 'Error Not Found', message: 'Error Not Found'})        
        }
    }

    static async registrasi(req, res, next){
        try {
            const {email, password, role} = req.body
            const newUser = await User.create({
                email,
                password,
                role
            })
            res.status(201).json(`Account with ${newUser.email} Created`)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        
        try {
            const userLogin = await User.findOne({
                where: {
                    email : req.body.email
                }
            })
            const verified = bcrypt.compareSync(req.body.password, userLogin.password)
            if (verified) {
                const token = jwt.sign({email : userLogin.email, role : userLogin.role}, process.env.JWT_SECRET)
                res.status(200).json(token)
            } else {
                next({name: 'Invalid Request', message: 'Email or Password Wrong'})
            }
        } catch (error) {
            next({name: 'Invalid Request', message: 'Email or Password Wrong'})
        }
    }

    static async googleLogin(req, res, next){
        try {
            const google_token = req.headers.google_token
        
            const payload = await verifyGoolge(google_token)
            
            const email = payload.email
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const password = process.env.DEFAULT_PASSWORD_GOOGLE
            if(user) {
                const check = bcrypt.compareSync(password, user.password)

                if(check){
                    const token = jwt.sign({email : user.email, role : user.role}, process.env.JWT_SECRET)
                    res.status(200).json(token)
                } else {
                    next({name: 'Invalid Request', message: 'You have registered user in server, please login to server again in page'})
                }

            }else{
                
                const newUser = await User.create({
                    email,
                    password,
                    role: 'reader'
                })
                const token = jwt.sign({email : newUser.email, role : newUser.role}, process.env.JWT_SECRET)
                res.status(200).json(token)
            }
            res.status(200).json({
                msg: 'Sudah didaftar di server'
            })
        } catch (error) {
            next(error)
        }

    }

    static getHolidays(req, res, next){
        axios({
            method: 'GET',
            url: 'https://api.festdays.dev/v1/holidays',
            params: {
                country: 'ID',
                size: '100',
                format: 'json',
                pretty: ['true', 'true'],
                year: `${req.body.year}`,
                key: process.env.CALENDER_KEY
            },
            headers: {accept: 'application/json'}
        })
        .then((result) => {
            res.status(200).json(result.data.results)    
        }).catch((err) => {
            next(err)    
        });
    }
}

module.exports = Controller