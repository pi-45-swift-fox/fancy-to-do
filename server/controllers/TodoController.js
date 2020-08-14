const { Todo } = require('../models')

class TodoController {
  static async create(req, res,next) {
    console.log('<<<<<<')
    const form = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId:req.userData.id
    }
    try {
      const dataTodo = await Todo.create(form)
      return res.status(201).json({msg:"berhasil create todo"})
    } catch (error) {
      next(error)
    }
  }
  static async update(req, res,next) {
    const id = req.params.id
    const todo = {
      title: req.body.title,
      status: req.body.status,
      due_date: req.body.due_date,
    }
    console.log(todo)
    try {
      const dataTodo = await Todo.update(todo, {where: {id} } )
      return res.status(200).json(dataTodo)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async delete(req, res,next) {
    const id = req.params.id
    try {
      const dataTodo = await Todo.destroy({
        where: {
          id
        }
      })
      res.status(200).json({msg:"berhasil delete todo"})
    } catch (error) {
      next(error)
    }

  }
  static async read(req, res,next) {
    const UserId = req.userData.id
    try {
      const dataTodo = await Todo.findAll({where:{UserId}})
      return res.status(200).json(dataTodo)
    } catch (error) {
      next(error)
    }
  }
  static async getEdit(req,res,next){
    const id = req.params.id
    try {
      const dataTodo = await Todo.findOne({where:{id}})
      res.status(200).json(dataTodo)
    } catch (error) {
      
    }
  }

}

module.exports = TodoController