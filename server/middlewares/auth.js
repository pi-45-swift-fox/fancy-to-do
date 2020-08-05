const { User, Todo } = require('../models');
const jwt = require('jsonwebtoken');

class Auth {
    static async check(req, res, next) {
        try {
            const userToken = jwt.verify(
                req.headers.accesstoken,
                process.env.JWT_SECRET
            );

            let data = await User.findOne({
                where: {
                    username: userToken.username
                }
            })

            req.userLogin = data;
            next();

        } catch (error) {
            next({
                code: 409,
                type: 'token',
                body: error
            });
            // console.log(error);
            // res.status(500).json({ msg: 'Unable to authenticate' });
        }
    }

    static async checkUser(req, res, next) {
        try {
            const data = await Todo.findByPk(+req.params.id);

            if (data) {
                if (data.UserId === req.userLogin.id) {
                    next();
                } else {
                    res.status(403).json('Access denied');
                }
            } else {
                res.status(404).json(`Unable to find the todo with this id:${+req.params.id}`)
            }

        } catch (error) {
            next({
                code: 403,
                type: 'token',
                body: error
            });
            // console.log(error);
            // res.status(500).json({ msg: 'Something went wrong!' });
        }
    }
}

module.exports = Auth;