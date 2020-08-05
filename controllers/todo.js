const { Todo } = require('../models');

module.exports = class TodoController {
    static main(req, res, next) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next({
                    code: 500,
                    type: 'todo',
                    body: err
                });
                // console.log(err);
                // res.status(500).json({ msg: 'Something went wrong!' });
            })
    }

    static detail(req, res) {
        Todo.findByPk(+req.params.id)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next({
                    code: 404,
                    type: 'todo',
                    body: err
                });
                // res.status(404).json({ msg: 'Not found' });
            })
    }

    static new(req, res) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            UserId: req.body.UserId
        };

        Todo.create(todo)
            .then(data => {
                res.status(201).json(data);
                // res.redirect('/');
            })
            .catch(err => {
                next({
                    code: 500,
                    type: 'todo',
                    body: err
                });
                // console.log(err);
                // res.status(500).json({ msg: 'Something went wrong!' });
            })
    }

    static delete(req, res) {
        Todo.destroy(+req.params.id)
            .then(() => {
                res.status(200).redirect('/todos');
            })
            .catch(err => {
                next({
                    code: 500,
                    type: 'todo',
                    body: err
                });
                // res.status(500).json({ msg: err });
            })
    }

    static edit(req, res) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            UserId: req.body.UserId
        };

        Todo.update(todo, { where: { id: +req.params.id } })
            .then(() => {
                res.status(200).redirect('/todos');
            })
            .catch(err => {
                next({
                    code: 404,
                    type: 'todo',
                    body: error
                });
                // res.status(404).json({ msg: 'Not found' });
            })
    }
}