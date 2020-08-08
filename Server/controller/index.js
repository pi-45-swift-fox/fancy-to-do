const {User, Todo} = require('../models')

class Controller{
    static async register(req, res, next){
        try{
            const newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                Due_date: req.body.Due_date,
                UserId: req.userLogin.id
            }
            
            const data = await Todo.create(newTodo,{include:User})
            res.status(201).json(data)
        }
        catch(err) {
            next(err)
        }
    }

    static async show(req,res, next){
        try{
            const data = await Todo.findAll({include:User})
            const newData = []
            data.forEach(el => {
                newData.push({
                    id: el.id,
                    title: el.title,
                    description : el.description,
                    status: el.status,
                    Due_date: el.Due_date.toDateString(),
                    UserId : el.UserId,
                    User: {
                        id : el.User.id,
                        email: el.User.email,
                        role: el.User.role
                    }
                })
            });
            // console.log(newData)
            res.status(200).json(newData)
        }catch(err){
            next(err)
        }
    }

    static async showId(req,res, next){
        try{
            const data = await Todo.findByPk(req.params.id)
            if(data){
                res.status(200).json(data)
            }else{
                next({errorCode: 'NOT_FOUND'})
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
                return next({errorCode: 'NOT_FOUND'})
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
                next({errorCode: 'NOT_FOUND'})
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