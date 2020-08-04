const { Todo } = require('../models')

class TodoControl {
    static show(req, res) {
        Todo.findAll()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }

    static create (req, res) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            Due_date: req.body.Due_date
        }
        Todo.create(obj)
            .then(todo => res.status(201).json(todo))
            .catch(err => res.status(500).json(err))
    }

    static getById (req,res) {
        Todo.findByPk(req.params.id)
        .then(data => {
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'error not found'})
            }
        })
        .catch(err => res.status(500).json(err))
    }

    static update(req, res) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            Due_date: req.body.Due_date
        }
        Todo.findByPk(req.params.id)
            .then(data => {
                if(!data) {
                    res.status(404).json({message: 'error not found'})
                } else {
                    return Todo.update(obj, {
                        where: {id: req.params.id}
                    })
                }
            })
            .then(update => res.status(200).json({dataUpdate:obj}))
            .catch(err => res.status(500).json(err))
    }

    static delete(req, res) {
        let dataDel = null
        Todo.findByPk(req.params.id)
        .then(data => {
            if(!data) {
                res.status(404).json({message: 'error not found'})
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
        .catch(err => res.status(500).json(err))
    }
}

module.exports = TodoControl