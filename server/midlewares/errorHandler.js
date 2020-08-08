function errorHandler (err, req, res, next) {
    let status = 500;
    let message = 'internal server error';
    console.log(err, 'ini di error handler');
    switch(err.name) {
        case "NotFound" :
            res.status(err.status).json({message: err.message})
        break;
        case "SequelizeValidationError":
            if(err.message === 'Validation error: Invalid validator function: unique') {
                return res.status(400).json({message: "email already registered"})
            } else if(err.message === 'Validation error: Validation isAfter on Due_date failed') {
                console.log('<siini?');
                res.status(400).json({message: 'Due Date Error!'})
            } else {
                res.status(400).json({message: err.message})
            }
        break;
        case "EmptyField":
            res.status(err.status).json(err.message)
        break;
        case "ValidationErrorItem":
            console.log('sini dong');
            res.status(err.status).json(err.message)
        break;
        case "Unauthenticated":
            res.status(err.status).json({message: err.message})
        break;
        case "Unauhtorized":
            res.status(err.status).json({message: err.message})
        break;
        case "BadRequest":
            res.status(err.status).json({message: err.message})
        break;
        case "JsonWebTokenError":
            res.json({message: err.message})
        break;
        case "SequelizeUniqueConstraintError":
            res.json({message: 'email already registered!'})
        break;
    }
}

module.exports = errorHandler