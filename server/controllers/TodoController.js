const { Todo } = require('../models')

class TodoController {
    static create (req, res, next) {
        const { title, description, status, Due_date } = req.body
        Todo.create({
            title,
            description,
            status,
            Due_date,
            UserId: req.UserId
        })
            .then(created => {
                return res.status(201).json(created)
            })
            .catch(err => {
                console.log(err);
                next (err)
            })
    }
    static list (req, res, next) {
        Todo.findAll({
            order: [
                ['id', 'asc']
            ]
        })
            .then(todos => {
                return res.status(200).json(todos)
            })
            .catch(err => {
                next (err)
            })
    }
    static edit (req, res, next) {
        const id = req.params.id
        let message;
        let status;
        if (!req.body.title) {
            message = "Title Cannot be Empty"
            status = 400
        } else if (!req.body.description) {
            message = "Description Cannot be Empty"
            status = 400
        } else if (!req.body.status) {
            message = "Status Cannot be Empty"
            status = 400
        } else if (!req.body.Due_date) {
            message = "Date Cannot be Empty"
            status = 400
        }
        if (message) {
            throw {
                status: 400,
                name: "EmptyField",
                message: message
            }
        }
        Todo.findByPk(id)
            .then(todo => {
                if (todo) {
                    todo.update({
                        title: req.body.title || todo.title,
                        description: req.body.description || todo.description,
                        status: req.body.status || todo.status,
                        Due_date: req.body.Due_date || todo.Due_date
                    })
                    return res.status(200).json(todo)
                } else {
                    throw {
                        message: "Todo Not Found",
                        status: 404,
                        name: "NotFound"
                    }
                }
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }
    static delete (req, res, next) {
        const id = req.params.id
        Todo.findByPk(id)
            .then(todo => {
                if (todo) {
                    todo.destroy()
                    return res.status(200).json(todo)
                } else {
                    throw {
                        message: "Todo Not Found",
                        status: 404,
                        name: "NotFound"
                    }
                }
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }
    static findOne (req, res, next) {
        const id = req.params.id
        Todo.findByPk(id)
            .then(todo => {
                if(todo) {
                    return res.status(200).json(todo)
                } else {
                    throw {
                        message: "Todo Not Found",
                        status: 404,
                        name: "NotFound"
                    }
                }
            })
            .catch(err => {
                console.log(err);
                next (err)
            })
    }
}

module.exports = TodoController