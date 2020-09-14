const { User, Todo } = require('../models/');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.accesstoken)
    return next({errorCode: "INVALID_ACCOUNT", message: "there is no token"})
  else
  {
    try
    {
      const userData = jwt.verify(req.headers.accesstoken, process.env.JWT_SECRET);

      User.findOne({where: {id: userData.id}, include: [Todo]})
        .then(data => {
          req.userLogin = data;
          next();
        })
        .catch(err => {
          return next(err);
        })
    }
    catch (err)
    {
      return next(err);
    }
  }
}
