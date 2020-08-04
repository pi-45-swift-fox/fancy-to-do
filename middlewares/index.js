const {User} = require('../models');
const jwt = require('jsonwebtoken');

class Auth {
    static check(req, res, next) {
        try {
            const userToken = jwt.verify(
                req.headers.accesstoken,
                process.env.JWT_SECRET
            );

            User.findOne({
                where: {
                    username: userToken.username
                }
            })
            .then(data => {
                req.userLogin = data;
                next();
            })

        } catch (error) {
            console.log(error);
            res.status(401).json({msg: 'Unable to authenticate'});
        }
    }

    static checkUser(req, res, next) {
        try {
            const data = await User.findByPk(+req.params.id);

            if(data.id === req.userLogin.id) {
                next();
            } else {
                res.status(403).json('Access denied');
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Something went wrong!'});
        }
    }
}

module.exports = Auth;