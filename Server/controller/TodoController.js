const {Todo, User} = require('../models')

class TodoController{
    static async add(req, res, next){
        try {

            const {title, description, due_date} = req.body
            let status = false
            let userId = req.userLogin.id
            const data = await Todo.create({title,description,status,due_date,userId}) 
            res.status(201).json({title,description,status,due_date,userId,message : "Todo list has been created"})

        } catch (error) {

            next( error )
        }
    }
    static async show(req, res, next){
        try {

            const data = await Todo.findAll(
                {where: {userId : req.userLogin.id}, order: [['due_date', 'ASC']]}
            )
            res.status(200).json(data)

        } catch (error){

            next ( error )
        }
    }
    static async showId(req, res, next){
        try{

            const data = await Todo.findByPk(req.params.id, {where: {userId : req.userLogin.id}})
            if(data){
                res.status(200).json(data)

            }else{
                return next({errorCode : "FORBIDDEN_REQUEST"})

            }
        }catch( error ){

            next ( error )
        }
    }
    static async update(req, res, next){
        try{
            const currentTodo = await Todo.findByPk(req.params.id)
            const {title,description,due_date} = req.body
            const status = false
            const userId = req.userLogin.id

            const newData = {
                title : req.body.title,
                description : req.body.description,
                due_date : req.body.due_date,
                status : req.body.status,
                userId
            }

            const data = await Todo.update({title,description,due_date,status,userId}, {where: {id:req.params.id}, returning:true})
            res.status(200).json({data})

        }catch(error){

            next(error)
        }
    }
    static async delete(req, res, next){
        try{
            
            const dataTodo = await Todo.findByPk(req.params.id)
            const currentTodo = await Todo.destroy({where: {id: req.params.id}})
            res.status(200).json({
                Data : dataTodo,
                Message: `Todo list with ${dataTodo.id} is deleted`})

        }catch(error){

            next(error)
        }
    }
}

module.exports = TodoController