const { User } = require('../models')
const { compareHash } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { verifyToken } = require('../helpers/googleoauth');

class UserController {
  static register (req, res, next) {
    const { email, password } = req.body;

    User.create({
      email,
      password
    })
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email,
          password: data.password
        })
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }

  static login (req, res, next) {
    console.log(req.body);
    const { email, password } = req.body;

    User
      .findOne({
        where: {
          email
        }
      })
      .then(user => {
        if (user) {
          let compare = compareHash(password, user.password);
          if (compare) {
            let payload = {
              id: user.id,
              email: user.email,
            };
            let access_token = generateToken(payload);
            res.status(200).json({
              access_token
            })
          } else {
            throw {
              msg: 'Invalid email/password',
              code: 400
            }
          }
        } else {
          throw {
            msg: 'Invalid email/password',
            code: 400
          }
        }
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }

  static googleLogin (req, res, next) {
    let email
    let newUser = false

    const { google_token } = req.headers
    verifyToken(google_token)
      .then(payload => {
        email = payload.email
        return User.findOne({
          where: {
            email
          }
        })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          newUser = true
          return User.create({
            email,
            password: process.env.GOOGLE_PASSWORD_DEFAULT
          })
        }
      })
      .then(newUser => {
        let code = newUser ? 201 : 200
        const access_token = generateToken({
          id: newUser.id,
          email: newUser.email
        })
        res.status(code).json({
          access_token
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController