function errorHandler(err, req, res, next) {
    console.log('masuk error handler')

    let message = 'internal server error'
    let statusCode = 500
    let errorCode = 'INTERNAL_SERVER_ERROR'

    if (err.name == 'SequelizeValidationError') {
        let errors = []
        err.errors.forEach(element => {
            errors.push(element.message)
        });
        
        message = errors.join()
        statusCode = 400
        errorCode = 'VALIDATION_ERROR'
    } else if (err.name == 'SequelizeUniqueConstraintError') {
        message = 'email already used'
        statusCode = 409
        errorCode = 'REGISTRATION_ERROR'
    } else if (err.errorCode == 'LOGIN_ERROR') {
        message = 'incorrect email or password'
        statusCode = 403
        errorCode = err.errorCode
    } else if (err.errorCode == 'ERROR_NOT_FOUND') {
        message = 'not found'
        statusCode = 404
        errorCode = err.errorCode
    } else if (err.errorCode == 'ERROR_AUTHENTICATION') {
        message = 'NOT AUTHENTICATED'
        statusCode = 401
        errorCode = err.errorCode
    }

    return res.status(statusCode).json({message, errorCode})
}

module.exports = errorHandler
