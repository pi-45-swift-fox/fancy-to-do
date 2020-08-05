const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt.js');

module.exports = {
  authentication: (req, res, next) => {
    let { access_token } = req.headers;

    try {
      let decoded = verifyToken(access_token);
      let { id } = decoded;
      User
        .findByPk(id)
        .then(data => {
          if (data) {
            req.userId = id;
            next();
          } else {
            throw {
              msg: "No authenticated",
              code: 401
            }
          }
        })
        .catch(err => {
          next(err);
        })
    } catch (err) {
      next(err);
    }
  }
}