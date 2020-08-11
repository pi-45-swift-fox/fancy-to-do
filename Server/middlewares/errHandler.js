function errorHandler(err, req, res, next){
    console.log(err)

    let statusCode = 500
    let message = 'INTERNAL SERVER ERROR'

    if (err.name == 'SequelizeValidationError') {
        const errors = []
        const arrayOfErrors = err.errors
        arrayOfErrors.forEach(el => {
            errors.push(el.message)
        });
        statusCode = 400
        message = errors

    } else if (err.errorCode == 'INVALID_USER'){
        statusCode = 400
        const errors = ['Incorrect email or password']
        message = errors

    } else if (err.errorCode == 'INVALID_TOKEN'){
        statusCode = 401
        message = ["Invalid Token"]

    } else if(err.errorCode == "INVALID_DATA"){
        statusCode = 404
        message = ["Data not found"]

    } else if(err.errorCode == "FORBIDDEN_REQUEST"){
        statusCode = 403
        message = ["Cannot access data"]

    } else if(err.errorCode == "INVALID_AUTHORIZATION"){
        statusCode = 403
        message = ["Not Authorize"]
    }

    return res.status(statusCode).json({message})
}

module.exports = errorHandler
