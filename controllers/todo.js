const { Todo } = require('../models');

class TodoController {
    static main(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Something went wrong!' });
            })
    }

    static detail(req, res) {
        Todo.findByPk(+req.params.id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).json({ msg: 'Not found' });
            })
    }

    static getNew(req, res) {
        // res.render('new-todo');
    }

    static postNew(req, res) {
        let data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            UserId: req.body.UserId
        };

        Todo.create(data)
            .then(data => {
                res.status(201).json(data);
                // res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Something went wrong!' });
            })
    }

    static delete(req, res) {
        Todo.destroy(+req.params.id)
            .then(() => {
                res.status(200).redirect('/todos');
            })
            .catch(err => {
                res.status(500).json({ msg: err });
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
            dueDate: req.body.dueDate,
            UserId: req.body.UserId
        };

        Todo.update(data, { where: { id: +req.params.id } })
            .then(() => {
                res.status(200).redirect('/todos');
            })
            .catch(err => {
                res.status(404).json({ msg: 'Not found' });
            })
    }
}

module.exports = TodoController;