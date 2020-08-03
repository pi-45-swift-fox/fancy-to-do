const { Todo } = require('../models/');

class TodoController {
  static viewAll(req, res)
  {
    Todo.findAll({order: [['id', 'ASC']]})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.status(500).json({"message": "Internal Server Error"});
      })
  }

  static post(req, res)
  {
    const obj = {
      "title": req.body.title,
      "description": req.body.description,
      "status": req.body.status,
      "due_date": new Date(req.body.due_date)
    }
    Todo.create(obj)
      .then(data => {
        return res.status(201).json(obj);
      })
      .catch(err => {
        return res.status(400).json({"message": err.message});
      })
  }

  static viewOne(req, res)
  {
    Todo.findByPk(+req.params.id)
      .then(data => {
        if (data)
          return res.status(200).json(data);
        return res.status(404).json({"message": "err not found"})
      })
      .catch(err => {
        return res.status(500).json({"message": "Internal Server Error"})
      });
  }

  static update(req, res)
  {
    const obj = {
      "title": req.body.title,
      "description": req.body.description,
      "status": req.body.status,
      "due_date": new Date(req.body.due_date)
    }

    Todo.update(obj, {where: {id: +req.params.id}, returning: true})
      .then(data => {
        if (data)
          return res.status(200).json(data[1][0]);
        return res.status(404).json({"message": "err not found"});
      })
      .catch(err => {
        return res.status(400).json({"message": err.message});
      })

  }

  static destroy(req, res)
  {
    let tempData;

    Todo.findByPk(+req.params.id)
      .then(data => {
        if (!data)
          return res.status(404).json({"message": "err not found"});
        tempData = data;
        return Todo.destroy({where: {id: +req.params.id}})
      })
      .then(data => {
        return res.status(200).json(tempData);
      })
      .catch(err => {
        return res.status(500).json({"message": "Internal Server Error"})
      })
  }
}

module.exports = TodoController;
