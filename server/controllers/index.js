// const HolidayAPI = require('holidayapi')
const {Todo, User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')
// const holidayApi = new HolidayAPI({ key });

class Controller {
    static async create(req, res){
        const UserId = req.userLogin.id
        const {title, description, status, Due_date} = req.body
        const newCreate = await Todo.create({
            title,
            description,
            status,
            Due_date,
            UserId
        })
        try {
            res.status(200).json(newCreate)
        } catch (error) {
            res.status(500).json('Invalid Server')
        }
        
    }

    static async read(req, res){
        const readAll = await Todo.findAll()
        try {
            res.status(200).json(readAll)
        } catch (error) {
            res.status(200).json('Invalid Server')
        }
    }
    
    static async readById(req, res){
        const readByPk = await Todo.findByPk(+req.params.id)
        try {
            res.status(200).json(readByPk)
        } catch (error) {
            res.status(404).json('Error Not Found')
        }
    }

    static async replace(req, res){
        const {title, description, status} = req.body
        const newReplace = await Todo.update({
            title, description, status
        },{
            where:{
                id: +req.params.id
            }
        })
        try {
            res.status(200).json(newReplace)
        } catch (error) {
            res.status(500).json('invalid server')
        }
    }

    static async destroy(req, res){
        const willDelete = await Todo.destroy({
            where:{
                id: +req.params.id
            } 
        })
        try {
            res.status(200).json(willDelete)
        } catch (error) {
            res.status(500).json('invalid server')         
        }
    }

    static async registrasi(req, res){
        const {username, password, role} = req.body
        const encriptedPs = bcrypt.hashSync(password, 10)
        const newUser = await User.create({
            username,
            password : encriptedPs,
            role
        })
        try {
            res.status(201).json(`Username with ${newUser.username} Created`)
        } catch (error) {
            res.status(400).json('Bad Request')
        }
    }

    static async login(req, res){
        const userLogin = await User.findOne({
            where: {
                username : req.body.username
            }
        })

        try {
            const verified = bcrypt.compareSync(req.body.password, userLogin.password)
            if (verified) {
                const token = jwt.sign({username : userLogin.username, role : userLogin.role}, process.env.JWT_SECRET)
                res.status(200).json(token)
            } else {
                res.status(404).json('Not Found')
            }
        } catch (error) {
            console.log(userLogin);
            console.log(bcrypt.compareSync(req.body.password, userLogin.password));
            res.status(400).json('Bad Request')
        }
    }

    static workday(req, res){
        const { country, start, days} = req.body
        axios({
            method: "GET",
            url: "https://holidayapi.com/v1/workday?pretty",
            params: {
                key : process.env.API_WORKDAY,
                country ,
                start ,
                days
            }
        })
        .then((result) => {
            return res.status(200).json(result.data)
        }).catch((err) => {
            return res.status(400).json('Not Found')
        });
    }
}

module.exports = Controller