const { User, Todo } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

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
                    email: req.userLogin.email
                },
                include: [Todo]
            })

            res.status(200).json(data.Todos);
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
                    throw 'No email found';
                }
            })
            .then(chck => {
                if (chck) {
                    const token = jwt.sign({
                        id: tmp.id,
                        username: tmp.username,
                        email: tmp.email
                    }, process.env.JWT_SECRET);

                    res.status(200).json({ username: tmp.username, token: token });
                } else {
                    throw 'Wrong Password';
                }
            })
            .catch(err => {
                next({
                    code: 401,
                    type: 'login',
                    body: err
                });
            })
    }

    static async register(req, res, next) {
        const data = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }, chck = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (chck) {
            console.log('masuk')
            next({
                code: 409,
                type: 'register',
            });
        } else {
            const result = await User.create(data)
                .then(data => {
                    res.status(201).json(data);
                })
                .catch(err => {
                    next({
                        code: 400,
                        type: 'register',
                        body: err
                    });
                })
            res.status(201).json({
                result
            });
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const token = req.headers.token;
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
            const payload = ticket.getPayload();

            const result = await User.findOne({
                where: {
                    email: payload.email
                }
            });

            if (result) {
                const token = jwt.sign({
                    id: result.id,
                    username: result.username,
                    email: result.email
                }, process.env.JWT_SECRET);

                res.status(200).json({ username: result.username, token: token });
            } else {
                const newUser = await User.create({
                    username: payload.name,
                    email: payload.email,
                    password: process.env.GOOGLE_PASSWORD
                });

                const token = jwt.sign({
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                }, process.env.JWT_SECRET);

                res.status(200).json({ username: newUser.username, token: token });
            }
        } catch (error) {
            console.log(error);
        }
    }
}