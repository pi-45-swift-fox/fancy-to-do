const {Todo} = require('../models')

class TodoController{
    static create(req,res){
        let newOne={
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        Todo.create(newOne)
            .then((Todo) =>{
                res.status(201).json(Todo)
            })
            .catch((err)=>{
                res.status(400).json({err:err.massage})
            })
    }

    static findAll(req,res){
        Todo.findAll()
            .then((Todos)=>{
                res.status(200).json(Todos)
            })
            .catch((err)=>{
                res.status(500).json({err:err.massage})
            })
    }

    static findOne(req,res){
        let id = +req.params.id
        Todo.findByPk(id)
            .then((Todo)=>{
                res.status(200).json(Todo)
            })
            .catch((err)=>{
                res.status(404).json({err:err.massage})
            })
    }

    static update(req,res){
        let id = +req.params.id
        let newEdit={
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        Todo.update(newEdit,{
            where: {
                id
            },
            returning : true
        })
            .then((Todo)=>{
                console.log(Todo)
                res.status(200).json(Todo[1][0])
            })
            .catch((err)=>{
                res.status(404).json({err:err.massage})
            })
    }

    static destroy(req,res){
        let id = +req.params.id
        let todoDelete = null
        Todo.findByPk(id)
            .then((Todo)=>{
                todoDelete = Todo
                return Todo.destroy({
                    where : {
                        id
                    },
                })
            })
            .then((todoDelete)=>{
                res.status(200).json(todoDelete)
            })
            .catch((err)=>{
                res.status(404).json({err:err.massage})
            })
    }
}
module.exports=TodoController;