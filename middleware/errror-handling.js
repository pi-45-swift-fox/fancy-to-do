module.exports=function(err,req,res,next){
    console.log(err)
    var massage='Internal Server Error'
    var statusCode=500
    let errorCode='INTERNAL_SERVER_ERROR'
    if(err.name==='SequelizeValidationError'){
        errorCode='VALIDATION_ERROR'
        massage= err.errors[0].message
        statusCode=400
    }
    else if(err.errorCode==='NOT_FOUND'){
        massage=err.message
        errorCode=err.errorCode
        statusCode=404
    }
    return res.status(statusCode).json({massage:massage})
}