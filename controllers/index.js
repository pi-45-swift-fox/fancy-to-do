const {Todo} = require('../models')
const jwt = require('jsonwebtoken')


class Controller {
    static async create(req, res){
        const {title, description, status} = req.body
        const newCreate = await Todo.create({
            title,
            description,
            status
        })
        try {
            // const token = jwt.sign({title,description,status}), process.env.JWT_SECRET)
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
}

module.exports = Controller