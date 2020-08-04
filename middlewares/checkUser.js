const { Todo } = require('../models')

function checkUser(req, res, next) {
    Todo.findByPk(req.params.id)
        .then(todo => {
            if(req.userLogin.dataValues.id !== todo.UserId) {
                res.status(401).json({message: 'not User'})
            } else {
                next()
            }
        })
        .catch(err => res.status(500).json(err))
}

module.exports = checkUser