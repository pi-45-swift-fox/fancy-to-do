const { Todo, User } = require('../models/');

module.exports = (req, res, next) => {
  console.log(req.userLogin.Todos, req.params.id);
  for(let i of req.userLogin.Todos)
  {
    if (+req.params.id == i.id)
      return next();
  }

  return next({ errorCode: "NOT_FOUND", message: `User ${req.userLogin.email} dont have a todo list with an id of ${+req.params.id}`});
}
