const { Todo } = require('../models/');
const mailHelper = require('../helper/mailHelper.js');

class TodoController {
  static viewAll(req, res, next)
  {
    Todo.findAll({order: [['id', 'ASC']]})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return next(err)
      })
  }

  static async post(req, res, next)
  {
    try
    {
      const obj = {
        "title": req.body.title,
        "description": req.body.description,
        "status": req.body.status,
        "due_date": new Date(req.body.due_date),
        "UsersId": +req.body.UsersId
      }
      const data = await Todo.create(obj);
      const email = await mailHelper(req.userLogin.email, data, 'Create');
      return res.status(201).json({data, email: "email has been sent"});
    }
    catch (err)
    {
      next(err);
    }
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
    try
    {
      const dateNow = new Date();
      const obj = {
        "title": req.body.title,
        "description": req.body.description,
        "status": req.body.status,
        "due_date": new Date(req.body.due_date),
        "UsersId": +req.body.UsersId
      };

      if (dateNow > obj.due_date)
        return next();

      const data = await Todo.update(obj, {where: {id: +req.params.id}, returning: true})

      if (data)
      {
        const email = await mailHelper(req.userLogin.email, data[1][0], 'Update');
        return res.status(200).json({data: data[1][0], email: "email has been sent"});
      }

      return next({ errorCode: "NOT_FOUND", message: `Todo list with id ${+req.params.id} not found`});
    }
    catch (err)
    {
      return next(err);
    }

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
