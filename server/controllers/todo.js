const { Todo } = require('../models');

module.exports = class TodoController {
    // static main(req, res, next) {
    //     Todo.findAll()
    //         .then(data => {
    //             res.status(200).json(data);
    //         })
    //         .catch(err => {
    //             next({
    //                 code: 500,
    //                 type: 'todo',
    //                 body: err
    //             });
    //         })
    // } DEPRECATED

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
                res.status(201).json({data});
            })
            .catch(err => {
                next({
                    code: 400,
                    type: 'todo',
                    body: err
                });
            })
    }

    static delete(req, res, next) {
        console.log(req.params.id)
        Todo.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(() => {
                res.status(200).json({
                    msg: 'delete success'
                });
            })
            .catch(err => {
                next({
                    code: 500,
                    type: 'todo',
                    body: err
                });
            })
    }

    static edit(req, res, next) {
        console.log(req.body)
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            UserId: req.userLogin.UserId
        };

        Todo.update(todo, { where: { id: +req.params.id } })
            .then(() => {
                res.status(201).json({
                    msg: 'OK'
                });
            })
            .catch(err => {
                next({
                    code: 404,
                    type: 'todo',
                    body: error
                });
            })
    }
}