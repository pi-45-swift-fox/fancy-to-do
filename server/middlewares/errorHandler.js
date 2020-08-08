module.exports = function (err, req, res, next) {
    let message = 'internal server error'
    let statusCode = 500
    let errorCode = 'INTERNAL_SERVER_ERROR'

    if(err.name == 'SequelizeValidationError') {
        message = err.errors[0].message
        statusCode = 400
        errorCode = 'VALIDATIN_ERROR'
    } else if (err.errorCode == 'NOT_FOUND_USER') {
        message = err.message
        statusCode = 401
        errorCode = err.errorCode
    } else if(err.errorCode == 'INVALID_ACCOUNT') {
        message = err.message
        statusCode = 401
        errorCode = err.errorCode
    } else if(err.errorCode == 'NOT_FOUND') {
        message = err.message
        statusCode = 404
        errorCode = err.errorCode
    } 

    return res.status(statusCode).json({message, errorCode})
}