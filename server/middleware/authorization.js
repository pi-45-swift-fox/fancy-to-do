const jwt = require('jsonwebtoken')
const { Todo } = require('../models')

function checkOwner(req, res, next) {
    Todo.findOne({
        where: {
            id : +req.params.id
        }
    })
    .then((result) => {
    if (req.userLogin.id !==  result.UserId) {
        res.status(500).json('Not Authorized')
    } else {
        next()
    }
        
    }).catch((err) => {
        res.status(500).json('Not Authorized')
    });

}

module.exports = checkOwner