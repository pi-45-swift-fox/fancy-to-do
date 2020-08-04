function errorHandler (err, req, res, next) {
    let status;
    let message;
    console.log(err, 'ini di error handler');
    switch(err.name) {
        case "NotFound" :
            res.status(err.status).json({message: err.message})
        break;
        case "SequelizeValidationError":
            res.status(400).json({message: err.message})
        break;
        case "EmptyField":
            res.status(err.status).json(err.message)
        break;
        case "Unauthenticated":
            res.status(err.status).json({message: err.message})
        break;
        case "Unauhtorized":
            res.status(err.status).json({message: err.message})
        break;
    }
}

module.exports = errorHandler