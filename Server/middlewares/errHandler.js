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

    } else if (err.errorCode == 'USER_EXIST') {
        statusCode = 400
        message = 'Email already exist'

    } else if (err.errorCode == 'INVALID_USER'){
        statusCode = 400
        message = "Incorrect email or password"

    } else if (err.errorCode == 'INVALID_TOKEN'){
        statusCode = 401
        message = "Invalid Token"
    }
    return res.status(statusCode).json({message})
}

module.exports = errorHandler
// module.exports = (err, req, res, next) => {
//     let generatedError = err.body, errorCode;
//     console.log(generatedError); // Tidak akan selalu ada (output: undefined)
//     switch (err.code) {
//         case 400:
//             errorCode = 'INPUT_VALIDATION_ERROR'; 
//             switch (err.type) {
//                 case ('register'):
//                     switch (err.body.errors[0].path) {
//                         case ('email'):
//                             res.status(err.code).json({
//                                 msg: 'Terjadi kesalahan pada input email',
//                                 err_code: errorCode
//                             });
//                             break;
//                         case ('username'):
//                             res.status(err.code).json({
//                                 msg: 'Terjadi kesalahan pada input username',
//                                 err_code: errorCode
//                             });
//                             break;
//                         case ('password'):
//                             res.status(err.code).json({
//                                 msg: 'Terjadi kesalahan pada input password',
//                                 err_code: errorCode
//                             });
//                             break;
//                         default:
//                             throw 'Unhandled error at code 400, case register';
//                     }
//                 case ('todo'):
//                     switch (err.body.errors[0].path) {
//                         case ('title'):
//                             res.status(err.code).json({
//                                 msg: 'Terjadi kesalahan pada input title',
//                                 err_code: errorCode
//                             });
//                             break;
//                         case ('dueDate'):
//                             res.status(err.code).json({
//                                 msg: 'Terjadi kesalahan pada input tanggal',
//                                 err_code: errorCode
//                             });
//                             break;
//                         case ('UserId'):
//                             res.status(500).json({
//                                 msg: 'Fatal error, no user found',
//                                 err_code : '',
//                                 description: generatedError
//                             })
//                         default:
//                             throw 'Unhandled error at code 400, case todo';
//                     }
//                     break;
//             }
//             break;
//         case 401:
//             errorCode = 'VALIDATION_ERROR';
//             res.status(err.code).json({
//                 msg: 'Username atau password salah',
//                 err_code: errorCode
//             });
//             break;
//         case 403:
//             errorCode = 'UNAUTHORIZED_ACCESS';
//             res.status(err.code).json({
//                 msg: 'Access denied',
//                 err_code: errorCode
//             });
//             break;
//         case 404:
//             errorCode = 'MISSING_DATA';
//             switch (err.type) {
//                 case ('login'):
//                     res.status(err.code).json({
//                         msg: 'Mohon untuk login terlebih dahulu',
//                         err_code: errorCode
//                     });
//                     break;
//                 case ('todo'):
//                     res.status(err.code).json({
//                         msg: 'Todo yang dicari tidak ditemukan',
//                         err_code: errorCode
//                     });
//                     break;
//             }
//             res.status(err.code).json({
//                 msg: 'No such data found',
//                 err_code: errorCode
//             });
//             break;
//         default:
//             errorCode = 'INTERNAL_ERROR'
//             res.status(err.code || 500).json({
//                 msg: 'Unhandled Error',
//                 err_code: errorCode,
//                 description: generatedError
//             });
//             break;
//     }
// }