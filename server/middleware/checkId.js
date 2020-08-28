const { Todo } = require('../models')

function checkId(req, res, next) {
    Todo.findByPk(+req.params.id)
        .then(data => {
            if (req.login.id == data.UserId) {
                next()
            } else {
                next({ errorCode: 'FORBIDDEN' })
            }
        })
        .catch(err => {
            next({ errorCode: 'NOT_FOUND' });
        })
}
module.exports = checkId