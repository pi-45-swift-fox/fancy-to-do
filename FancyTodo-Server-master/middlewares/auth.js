const { User, Task } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    const token = req.headers.token
    if (!token) {
        res.status(401).json({
            error: 'please login first'
        })
    } else {
        const payload = verifyToken(token)
        try {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if (!user) {
                res.status(401).json({
                    error: 'login first'
                })
            } else {
                req.userLogin = user
                next()
            }
        } catch (err) {
            res.status(500).json({
                error: 'internal server error'
            })
        }
    }
}

async function isOwner(req, res, next) {
    try {
        const task = await Task.findByPk(req.params.id)
        if (!task) {
            res.status(404).json({
                error: 'Task not Found'
            })
        } else {
            if (task.UserId !== req.userLogin.id) {
                res.status(401).json({
                    error: 'Not Authorized to Access this'
                })
            } else {
                next()
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: 'Invalid server error'
        })
    }
}

module.exports = {
    authentication,
    isOwner
}