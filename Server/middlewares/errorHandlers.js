module.exports = function(err, req, res, next){
    let message = 'Internal Server Error'
    let statusCode = 500
    if(err.name == "SequelizeValidationError"){
        statusCode = 400
        message = err.errors[0].message
    }else if (err === '404'){
        statusCode = 404
        message = 'Data not Found'
    }
    res.status(statusCode).json({message})
}