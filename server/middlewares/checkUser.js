const { Todo } = require('../models')

function checkUser(req, res, next) {
    Todo.findByPk(req.params.id)
        .then(todo => {
            if(req.user.id !== todo.UserId) {
                next({errorCode: 'INVALID_ACCOUNT', message: 'not user'})
            } else {
                next()
            }
        })
        .catch(err => next(err))
}

module.exports = checkUser