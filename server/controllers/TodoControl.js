const { Todo } = require('../models')

class TodoController {
    static show(req, res, next) {
        Todo.findAll({where: {UserId: req.user.id}})
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    }

    static create (req, res, next) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            UserId: req.user.id
        }
        Todo.create(todo)
            .then(todo => res.status(201).json(todo))
            .catch(err => next(err))
    }

    static getById (req, res, next) {
        Todo.findByPk(req.params.id)
        .then(data => {
            if(data) {
                res.status(200).json(data)
            } else {
                next({errorCode: 'NOT_FOUND', message: 'error not found'})
            }
        })
        .catch(err => next(err))
    }

    static update(req, res, next) {
        let dataUpdate = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        }
        Todo.findByPk(req.params.id)
            .then(data => {
                if(!data) {
                    next({errorCode: 'NOT_FOUND', message: 'error not found'})
                } else {
                    return Todo.update(dataUpdate, {
                        where: {id: req.params.id}
                    })
                }
            })
            .then(update => res.status(200).json({dataUpdate}))
            .catch(err => next(err))
    }

    static delete(req, res, next) {
        let dataDel = null
        Todo.findByPk(req.params.id)
        .then(data => {
            if(!data) {
                next({errorCode: 'NOT_FOUND', message: 'error not found'})
            } else {
                dataDel = data
                return Todo.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(success => res.status(200).json({dataDel}))
        .catch(err => next(err))
        // Todo.destroy({
        //     where: {
        //         id: req.params.id
        //     }
        // })
        // .then(success => {
        //     if(success) {
        //         res.status(200).json({dataDel})
        //     } else {
        //         res.status(404).json({message: 'error not found'})
        //     }
        // })
        // .catch(err => res.status(500).json(err))
    }
}

module.exports = TodoController