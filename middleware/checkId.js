const { Todo } = require('../models')

function checkId(req, res, next) {
    Todo.findByPk(+req.params.id)
        .then(data => {
            if (req.login.id == data.UserId) {
                next()
            } else {
                res.status(500).json({ message: 'Not authenticate' })
            }
        })
        .catch(err => {
            // console.log(err);
            next('NOT_FOUND');
            // res.status(500).json({ message: 'internal error' })
        })
}
module.exports = checkId