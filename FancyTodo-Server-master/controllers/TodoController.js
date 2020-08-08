require('dotenv').config()
const { Task } = require('../models/index')
const axios = require('axios')

class TodoController {
    static index(req, res, next) {
        Task.findAll({where: {UserId: req.userLogin.id}}).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            next(err)
        })
    }

    static create(req, res, next) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.userLogin.id
        }
        Task.create(task).then(data => {
            res.status(201).json(task)
        }).catch(err => {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: 'ValidationError',
                    errors: err.errors[0].message
                })
            } else {
                next(err)
            }
        })
    }

    static read(req, res, next) {
        Task.findByPk(req.params.id).then(data => {
            if(data == null) {
                next({
                    name: 'NotFound',
                    errors: 'Task Not Found'
                })
            } else {
                res.status(200).json(data)
            }
        }).catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        Task.update(task, {where: {id: req.params.id}}).then(data => {
            if(data == 0) {
                next({
                    name: 'NotFound',
                    errors: 'Task Not Found'
                })
            } else {
                res.status(201).json({
                    title: task.title,
                    description: task.description,
                    due_date: task.due_date
                })
            }
        }).catch(err => {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: 'ValidationError',
                    errors: err.errors[0].message
                })
            } else {
                next(err)
            }
        })
    }
    
    static delete(req, res) {
        let task
        Task.findByPk(req.params.id).then(data => {
            task = data
            return Task.destroy({where: {id: req.params.id}})
        })
        .then(data => {
            if(data == 0) {
                next({
                    name: 'NotFound',
                    errors: 'Task Not Found'
                })
            } else {
                res.status(200).json({
                    title: task.title,
                    description: task.description
                })
            }
        }).catch(err => {
            next(err)
        })
    }

    static weather(req, res) {
        axios({
            methode: 'GET',
            url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=fetch:ip`
        })
        .then(result => {
            res.status(200).json(result.data)
        }).catch(err => {
            next(err)
        });
    }
}

module.exports = TodoController