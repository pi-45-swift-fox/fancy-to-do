const { User } = require('../models')
const { encode, decode } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')
const {OAuth2Client, UserRefreshClient} = require('google-auth-library');

class UserController {
  static async login(req, res, next) {
    const email = req.body.email
    try {
      const dataUser = await User.findOne({
        where: {
          email
        }
      })
      if (!dataUser) {
        throw {
          name: "Validation_error",
          statusCode: 400,
          message: "email or password incorrect"
        }
      } else {
        const password = req.body.password
        if (checkPassword(password, dataUser.password)) {
          const data = {
            id:dataUser.id,
            email:dataUser.email
          }
          const token = encode( data )
          return res.status(200).json({ access_token: token })
        } else {
          // return res.status(400).json({ message: "email or password incorrect" })
          throw {
            name: "Validation_error",
            statusCode: 400,
            message: "email or password incorrect"
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    const regis = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const dataUser = await User.create(regis)
      return res.status(201).json({ message:'berhasil register' })
    } catch (error) {
      next(error)
    }
  }
  static async googleSignIn(req, res, next) {
    const id_token = req.body.id_token

    const client = new OAuth2Client(process.env.CLIENT_ID);
    try {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID, 
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      const user = await User.findOne({where: {email : payload.email}})
      if(user){
        const userData = {
          email : user.email,
          id:user.id
        }
        const token = encode(userData)
        return res.status(200).json({access_token:token})
      }else{        
        const userdata = {
          email : payload.email,
          password : '123321'
        }
        const addUser = await User.create(userdata)           
        const token = encode(addUser)
        return res.status(201).json({access_token:token})
      }

    } catch (err) {
      next(err)
    }
   
  }
}

module.exports = UserController