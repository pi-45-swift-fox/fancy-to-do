const {Todo} = require('../models')

class TodoController {
    static async create(req, res, next) {
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status == 'true' ? true : false,
            due_date: req.body.due_date,
            UserId: req.userLogin.id
        }

        try {
            const todo = await Todo.create(data)
            res.status(201).json(todo)
        }

        catch(err) {
            next(err)
        }
    }

    static async show(req, res, next) {
        try {
            const todo = await Todo.findAll()

            res.status(200).json(todo)
        }
        catch(err) {
            next(err)
        }
    }

    static async showById(req, res, next) {
        try {
            const todo = await Todo.findOne({
                where: {
                    id: req.params.id,
                    UserId: req.userLogin.id
                }
            })

            if (todo == null) {
                next({errorCode: 'ERROR_NOT_FOUND'})
            } else {
                res.status(200).json(todo)
            }
        }

        catch(err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        const query = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status == 'true' ? true : false,
            due_date: req.body.due_date
        }

        try {
            const updated = await Todo.update(query, {
                where: {
                    id: req.params.id,
                    UserId: req.userLogin.id
                }
            })

            if (updated[0] == 0) {
                next({errorCode: 'ERROR_NOT_FOUND'})
            } else {
                res.status(200).json(query)
            }
        }
        catch(err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const todo = await Todo.findByPk(req.params.id)
            const deleted = await Todo.destroy({
                where: {
                    id: req.params.id
                }
            })
            
            if (deleted == 0) {
                next({errorCode: 'ERROR_NOT_FOUND'})
            } else {
                res.status(200).json(todo)
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = TodoController
