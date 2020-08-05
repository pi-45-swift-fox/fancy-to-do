const { User, Todo } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'userid',
        pass: 'pass'
    }
});

module.exports = class UserController {
    static async main(req, res, next) {
        try {
            const data = await User.findAll({ include: [Todo] });
            res.status(200).json(data);
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    static async detail(req, res, next) {
        try {
            const data = await User.findOne({
                where: {
                    username: req.userLogin.username
                },
                include: [Todo]
            })

            res.status(200).json(data);
        } catch (error) {
            next({
                code: 404,
                type: 'login',
                body: error
            });
        }
    }

    static async send(req, res, next) {
        try {
            const data = JSON.stringify(await User.findByPk(req.body.Kasih_ID, { include: [Todo] }));
            const message = {
                from: req.body.from,
                to: req.body.to,
                subject: 'Berikut adalah Data Anda di Server',
                text: data
            };

            let result = await transport.sendMail(message);
            res.status(201).json({
                msg: `Success! Please, check your email: ${req.body.to}`,
                result: result
            })
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    static login(req, res, next) {
        let tmp;

        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if (data) {
                    tmp = data;
                    req.userLogin = data;
                    
                    return bcrypt.compare(req.body.password, data.password);
                } else {
                    throw 'Missing data';
                }
            })
            .then(chck => {
                if (chck) {
                    const token = jwt.sign({
                        id: tmp.id,
                        username: tmp.username,
                    }, process.env.JWT_SECRET);

                    res.status(200).json({ username: tmp.username, token: token });
                } else {
                    next({
                        code: 401,
                        type: 'login'
                    });
                    // res.status(401).json({err: 'Username or password is incorrect!'});
                }
            })
            .catch(err => {
                next({
                    code: 401,
                    type: 'login',
                    body: err
                });
                // If database somehow could not access any data related, use:
                // console.log(err), next({ code: 500, type: 'sequelize' });
            })
    }

    static register(req, res, next) {
        let data = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };

        User.create(data)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                next({
                    code: 400,
                    type: 'register',
                    body: err
                });
                // console.log(err);
                // res.status(400).json(err);
            })
    }
}