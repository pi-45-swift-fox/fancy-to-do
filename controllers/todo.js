const {Todo} = require('../models');

class TodoController {
    static main(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
    }

    static detail(req, res) {
        Todo.findByPk(+req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(404).send('Not Found');
        })
    }

    static getNew(req, res) {
        res.render('new-todo');
    }

    static postNew(req, res) {
        let data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate
        };

        Todo.create(data)
        .then(data => {
            res.status(201).send(data);
            // res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Something went wrong!');
        })
    }

    static delete(req, res) {
        Todo.destroy(+req.params.id)
        .then(() => {
            res.status(200).redirect('/todos');
        })
        .catch(err => {
            res.status(404).send('Not Found');
        })
    }

    static getEdit(req, res) {
        res.render('edit-todo');
    }

    static postEdit(req, res) {
        let data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate
        };

        Todo.update(null, {where: {id: 999/*+req.params.id*/}})
        .then(() => {
            res.status(200).redirect('/todos');
        })
        .then(err => {
            res.send(err);
            // res.status(404).send('Not Found');
        })
    }
}

module.exports = TodoController;