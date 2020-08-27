const { Todo, User } = require('../models')

class TodoController {
    static async read(req, res, next) {
        try {
            const result = await Todo.findAll({
                    where: {
                        UserId: req.login.id
                    }
                })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            let newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: false,
                due_date: req.body.due_date,
                UserId: req.login.id
            }
            const create = await Todo.create(newTodo)
            res.status(201).json(newTodo)
        } catch (err) {
            next(err);
        }
    }

    static async findById(req, res, next) {
        try {
            const result = await Todo.findByPk(+req.params.id, { include: User })
            if (!result) {
                next({ errorCode: 'NOT_FOUND' });
            } else {
                res.status(200).json(result)
            }
        } catch (err) {
            next(err)
        }

    }

    static async updateStatusTodo(req, res, next) {
        try {
            const updated = await Todo.update({ status: req.body.status }, {
                where: {
                    id: +req.params.id
                }
            })
            if (!updated) {
                next({ errorCode: 'NOT_FOUND' });
            } else {
                const todo = await Todo.findByPk(+req.params.id)
                res.status(200).json(todo)
            }
        } catch (err) {
            next(err);
        }
    }

    static async updateTodo(req, res, next) {
        try {
            const updatetodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.body.UserId
            }

            const updated = await Todo.update(updatetodo, {
                where: {
                    id: +req.params.id
                }
            })
            if (!updated) {
                next({ errorCode: 'NOT_FOUND' });
            } else {
                const todo = await Todo.findByPk(+req.params.id)
                res.status(200).json(todo)
            }
        } catch (err) {
            next(err);
        }

    }

    static async deleteTodo(req, res, next) {
        try {
            const todo = await Todo.findByPk(+req.params.id)
            const delTodo = await Todo.destroy({
                where: {
                    id: +req.params.id
                },
                returning: true
            })
            if (delTodo === 0) {
                next({ errorCode: 'NOT_FOUND' });
            } else {
                res.status(200).json(todo)
            }

        } catch (err) {
            next(err)
        }
    }

}

module.exports = TodoController