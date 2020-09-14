const { Todo } = require('../models/');
const mailgun = require('../helper/mailgun.js')

class TodoController {
  static viewAll(req, res, next)
  {
    Todo.findAll({order: [['id', 'ASC']], where: {UsersId: req.userLogin.id}})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return next(err)
      })
  }

  static post(req, res, next)
  {
    const obj = {
      "title": req.body.title,
      "description": req.body.description,
      "status": req.body.status,
      "due_date": new Date(req.body.due_date),
      "UsersId": +req.userLogin.id
    }

    Todo.create(obj)
      .then(data => {
        // mailgun(req.userLogin.email, data, "Create");
        return res.status(201).json({data, message: `email has been sent to ${req.userLogin.email}`});
      })
      .catch(err => next(err));
  }

  static viewOne(req, res, next)
  {
    Todo.findByPk(+req.params.id)
      .then(data => {
        if (data)
          return res.status(200).json(data);
        return next({ errorCode: "NOT_FOUND", message: `Todo list with id ${+req.params.id} not found`});
      })
      .catch(err => {
        return next(err);
      });
  }

  static async update(req, res, next)
  {
    const dateNow = new Date();
    const obj = {
      "title": req.body.title,
      "description": req.body.description,
      "status": req.body.status,
      "due_date": new Date(req.body.due_date),
      "UsersId": +req.userLogin.id
    };

    if (dateNow > obj.due_date)
      return next();

    Todo.update(obj, {where: {id: +req.params.id}, returning: true})
      .then(data => {
        if (data)
        {
          // mailgun(req.userLogin.email, data[1][0], "Update");
          return res.status(200).json({data: data[1][0], message: `email has been sent to ${req.userLogin.email}`});
        }
        return next({ errorCode: "NOT_FOUND", message: `Todo list with id ${+req.params.id} not found`});

      })
      .catch(err => next(err));
  }

  static destroy(req, res, next)
  {
    let tempData;

    Todo.findByPk(+req.params.id)
      .then(data => {
        if (!data)
          return next({ errorCode: "NOT_FOUND", message: `Todo list with id ${+req.params.id} not found`});
        tempData = data;
        return Todo.destroy({where: {id: +req.params.id}})
      })
      .then(data => {
        return res.status(200).json(tempData);
      })
      .catch(err => {
        return next(err);
      })
  }
}

module.exports = TodoController;
