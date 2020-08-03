const { Todo } = require('../models')
const checkDate = require('../helper/checkDate')
class TodoController {
    static async read(req, res) {
        try {
            const result = await Todo.findAll()
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json({ message: 'internal errors' })
        }

    }

    static async create(req, res) {
        try {
            if (!checkDate(req.body.due_date)) {
                res.status(400).json({ message: 'validation errors' })
            } else {
                let newTodo = {
                    title: req.body.title,
                    description: req.body.description,
                    status: false,
                    due_date: req.body.due_date
                }
                const create = await Todo.create(newTodo)
                res.status(201).json(newTodo)
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'internal errors' })
        }
    }

    static async findById(req, res) {
        try {
            const result = await Todo.findByPk(+req.params.id)
            console.log(result);
            if (result == 0 || result == null) {
                res.status(404).json({ message: 'error not found' })
            } else {
                res.status(200).json(result)
            }

        } catch (err) {
            console.log(err);
            res.status(500).json('internal errors')
        }

    }

    static async updateTodo(req, res) {
        try {
            if (!checkDate(req.body.due_date)) {
                res.status(400).json({ message: 'validation errors' })
            } else {
                const updatetodo = {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    due_date: req.body.due_date
                }
                const updated = await Todo.update(updatetodo, {
                    where: {
                        id: +req.params.id
                    }
                })
                if (updated == 0 || updated == null) {
                    res.status(404).json({ message: 'error not found' })
                } else {
                    const todo = await Todo.findByPk(+req.params.id)
                    res.status(200).json(todo)
                }
            }
        } catch {
            res.status(500).json({ message: 'internal errors' })
        }

    }

    static async deleteTodo(req, res) {
        try {
            const todo = await Todo.findByPk(+req.params.id)
            const delTodo = await Todo.destroy({
                where: {
                    id: +req.params.id
                }
            })
            if (delTodo === 0) {
                res.status(404).json({ message: 'error not found' })
            } else {
                res.status(200).json(todo)
            }

        } catch (err) {
            res.status(500).json({ message: 'internal errors' })
        }
    }

}

module.exports = TodoController