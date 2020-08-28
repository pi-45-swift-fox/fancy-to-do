function handleError(err, req, res, next) {
    let message = 'Invalid Server' 
    let status = 500
    if (err.name === 'SequelizeValidationError')  {
        status = 403
        message = err.message
    } else if(err.name === 'Invalid Request'){
        status = 400
        message = err. message
    } else if(err.name === 'Error Not Found'){
        status = 404
        message = err. message
    }
    res.status(status).json(message) 
    console.log(err);
}

module.exports = handleError