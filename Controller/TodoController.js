const { Todo } = require('../models/');

class TodoController {
  static viewAll(req, res)
  {
    Todo.findAll({order: [['id', 'ASC']]})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return next(err)
      })
  }

  static post(req, res)
  {
    const obj = {
      "title": req.body.title,
      "description": req.body.description,
      "status": req.body.status,
      "due_date": new Date(req.body.due_date),
      "UsersId": +req.body.UsersId
    }

    Todo.create(obj)
      .then(data => {
        return res.status(201).json(obj);
      })
      .catch(err => {
        return next(err)
      })
  }

  static viewOne(req, res)
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

  static update(req, res)
  {
    const dateNow = new Date();
    const obj = {
      "title": req.body.title,
      "description": req.body.description,
      "status": req.body.status,
      "due_date": new Date(req.body.due_date),
      "UsersId": +req.body.UsersId
    }
    if (dateNow > obj.due_date)
      return next()

    Todo.update(obj, {where: {id: +req.params.id}, returning: true})
      .then(data => {
        if (data)
          return res.status(200).json(data[1][0]);
        return next({ errorCode: "NOT_FOUND", message: `Todo list with id ${+req.params.id} not found`});
      })
      .catch(err => {
        return next(err);
      })

  }

  static destroy(req, res)
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
