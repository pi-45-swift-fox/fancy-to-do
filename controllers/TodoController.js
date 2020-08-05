const {Todo} = require('../models')

class TodoController {
    static async create(req, res) {
        const query = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status == 'true' ? true : false,
            due_date: req.body.due_date
        }

        try {
            const todo = await Todo.create(query)
            res.status(201).json(todo)
        }

        catch(err) {
            if (err.name == 'SequelizeValidationError') {
                let errors = []
                err.errors.forEach(element => {
                    errors.push(element.message)
                });
                res.status(400).json({message: errors.join()})
            } else {
                res.status(500).json('Internal server error')
            }
        }
    }

    static async show(req, res) {
        try {
            const todo = await Todo.findAll()

            res.status(200).json(todo)
        }
        catch(err) {
            res.status(500).json.json('Internal server error')
        }
    }

    static async showById(req, res) {
        try {
            const todo = await Todo.findOne({
                where: {
                    id: req.params.id
                }
            })
            // console.log(todo)
            if (todo == null) {
                res.status(404).json({message: 'not found'})
            } else {
                res.status(200).json(todo)
            }
        }

        catch(err) {
            res.status(500)
        }
    }

    static async update(req, res) {
        const query = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status == 'true' ? true : false,
            due_date: req.body.due_date
        }

        try {
            const updated = await Todo.update(query, {
                where: {
                    id: req.params.id
                }
            })
            // console.log(updated)
            if (updated[0] == 0) {
                res.status(404).json({message: 'not found'})
            } else {
                res.status(200).json(query)
            }
        }
        catch(err) {
            // console.log(err)
            if (err.name == 'SequelizeValidationError') {
                let errors = []
                err.errors.forEach(element => {
                    errors.push(element.message)
                });
                res.status(400).json({message: errors.join()})
            } else {
                res.status(500).json('Internal server error')
            }
        }
    }

    static async delete(req, res) {
        try {
            const todo = await Todo.findByPk(req.params.id)
            const deleted = await Todo.destroy({
                where: {
                    id: req.params.id
                }
            })
            // console.log(deleted)
            if (deleted == 0) {
                res.status(404).json({message: 'not found'})
            } else {
                res.status(200).json(todo)
            }
        }
        catch(err) {
            // console.log(err)
            res.status(500).json('Internal server error')
        }
    }
}

module.exports = TodoController
