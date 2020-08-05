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

    static detail(req, res, next) {
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

    static new(req, res, next) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            UserId: req.userLogin.id
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

    static delete(req, res, next) {
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

    static edit(req, res, next) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            UserId: req.userLogin.UserId
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