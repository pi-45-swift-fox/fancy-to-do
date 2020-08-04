const {User} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const TodoController = require('./todo');

class HomeController {
    static main(req, res) {
        res.send('Homepage');
    }

    static login(req, res) {
        let tmp;

        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(data => {
            tmp = data;
            return bcrypt.compare(req.body.password, data.password);
        })
        .then(chck => {
            if (chck) {
                const token = jwt.sign({
                    id: tmp.id,
                    username: tmp.username,
                }, process.env.JWT_SECRET);

                res.status(200).json({username: tmp.username, token: token});
            } else {
                res.status(401).json({err: 'Username or password is incorrect!'});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }

    static register(req, res) {
        bcrypt.hash(req.body.password, 10)
        .then(encryptedPassword => {
            let data = {
                username: req.body.username,
                password: encryptedPassword
            };

            return User.create(data);
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
}

module.exports = {HomeController, TodoController};