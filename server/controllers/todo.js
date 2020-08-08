const { Todo } = require('../models')

class TodoController {
  static create (req, res, next) {
    let payload = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.userId
    }

    Todo
      .create(payload)
      .then((data) => {
        return res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findAll (req, res, next) {
    Todo
      .findAll({
        where: { UserId: req.userId },
        order: [
          ['id', 'ASC']
        ]
      })
      .then((result) => {
        return res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findById (req, res, next) {
    const { id } = req.params
    Todo
      .findByPk(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static update (req, res, next) {
    const { title, description, status, due_date } = req.body
    const { id } = req.params
    Todo
      .update({
        title,
        description,
        status,
        due_date: new Date(due_date)
      }, {
        where: {
          id
        }
      })
      .then(() => {
        return Todo
          .findByPk(id)
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err);
      })
  }

  static delete (req, res, next) {
    const { id } = req.params
    Todo
      .findByPk(id)
      .then((data) => {
        if (data) {
          Todo
            .destroy({
              where: {
                id: id
              }
            })
            .then(() => {
              let result = []
              result.push(data)
              res.status(200).json(result)
            })
        } else {
          let result = {
            error: "Not found."
          }
          res.status(404).json(result)
        }
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = TodoController