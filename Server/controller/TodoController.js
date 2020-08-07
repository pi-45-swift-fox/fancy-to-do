const {Todo} = require('../models')

class TodoController{
    static async add(req, res, next){
        try {
            const {title, description, due_date} = req.body
            let status = false
            let userId = req.userLogin.id
            const data = await Todo.create({title,description,status,due_date,userId}) 
            res.status(200).json({title,description,status,due_date,userId,message : "Todo list has been created"})

        } catch (error) {
            next(error)
        }
    }
    static async show(req, res, next){
        try {

        } catch (error){
            
        }
    }
    static showId(req, res, next){
        
    }
    static update(req, res, next){
        
    }
    static delete(req, res, next){
        
    }
}

module.exports = TodoController