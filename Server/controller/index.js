const {Todo} = require('../models')

class Controller{
    static async register(req, res, next){
        try{
            const newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                Due_date: req.body.Due_date,
            }
            const data = await Todo.create(newTodo)
            res.status(201).json(data)
        }
        catch(err) {
            next(err)
        }
    }

    static show(req,res, next){
        Todo.findAll()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static async showId(req,res, next){
        try{
            const data = await Todo.findByPk(req.params.id)
            if(data){
                res.status(200).json(data)
            }else{
                next('404')
            }
        }
        catch(err){
            next(err)
        }
    }

    static async update(req, res, next){
        try{
            const newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                Due_date: req.body.Due_date,
            }
            const dataId = await Todo.findByPk(req.params.id)
            if(!dataId){
                return next('404')
            }else{
                dataId.update(newTodo, {where: {id:req.params.id}, returning:true})
                .then(data=>{
                    res.status(200).json(data)
                })
                .catch(err=>{
                    next(err)
                })
                // MAGIC
            }
        }catch(err){
            next(err)
        }
    }
    
    static async delete(req, res, next){
        try{
            const data = await Todo.findByPk(req.params.id)
            if(!data){
                next('404')
            }else{
                await Todo.destroy({where:{id:req.params.id}})
                res.status(200).json(data)
            }
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = Controller