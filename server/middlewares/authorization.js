const { Todo } = require('../models');

module.exports = {
  authorization: (req, res, next) => {
    const { id } = req.params;

    Todo
      .findByPk(id)
      .then(result => {
        if (result) {
          if (result.UserId === req.userId) {
            next();
          } else {
            throw {
              msg: "No authorized",
              code: 401
            }
          }
        } else {
          throw {
            msg: "Todo not found",
            code: 404
          }
        }
      })
      .catch(err => {
        next(err);
      })
  }
}