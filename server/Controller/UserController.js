const { User, Todo } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

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

  static async googleLogin(req, res, next)
  {
    // mebuat objek oauth2 berdasarkan clientid aplikasi kita
    const client = new OAuth2Client(process.env.CLIENT_ID);
    // cek verifikasi identitas melalui google
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: req.body.token,
          audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      console.log(payload);
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
      try
      {
        // cari apakah user tsb ada di data
        const data = await User.findOne({where: {email: payload.email}})

        //jika tidak ada create user baru
        if (!data)
        {
          const data = await User.create({email: payload.email, password: 'qwerty'});
        }

        // kembalikan token versi server kita supaya nanti di set ke localstorage
        const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET);

        return res.status(200).json({accesstoken: token})
      }
      catch (err)
      {
        console.log(err);
      }
    }
    verify().catch(console.error);

  }
}

module.exports = UserController;
