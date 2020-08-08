module.exports = function(err, req, res, next) {
    // console.log('err', err);

    let statusCode = 500
    let message = 'Internal server errors'

    if (err.name == 'SequelizeValidationError') {
        statusCode = 400
        if (err.errors.length > 1) {
            let errors = []
            err.errors.forEach(el => {
                errors.push(el.message)
            });
            message = errors
        } else {
            message = err.errors[0].message
        }
    } else if (err.errorCode == 'NOT_FOUND') {
        message = 'Data Not Found'
        statusCode = 404
    } else if (err.errorCode == 'INVALID_ACCOUNT' || err.name == 'JsonWebTokenError') {
        message = 'Incorrect email or password'
        statusCode = 401
    } else if (err.errorCode == 'FORBIDDEN') {
        message = 'Forbidden Request'
        statusCode = 403
    } else if (err.errorCode = 'DUPLICATE_EMAIL') {
        message = err.message
        statusCode = 401
    }
    return res.status(statusCode).json({ message })

}