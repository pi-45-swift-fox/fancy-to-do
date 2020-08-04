const { User, Todo } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static register(req, res, next)
  {
    const { email, password } = req.body;

    User.create({ email, password })
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(err => {
        return next(err)
      })
  }

  static login(req, res, next)
  {
    const { email, password } = req.body;

    User.findOne({where: {email: email}})
      .then(data => {
        if (!data)
          return next({ errorCode: "NOT_FOUND", message: `email ${email} is not registered`});

        const check = bcrypt.compareSync(password, data.password);
        if (check)
        {
          const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
          req.userLogin = token;
          return res.status(200).json({accesstoken: token})
        }
        else
        {
          return next({ errorCode: "INVALID_ACCOUNT", message: `email or password wrong`});
        }
      })
      .catch(err => {
        return next(err)
      })
  }
}

module.exports = UserController;
