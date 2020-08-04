module.exports = (err, req, res, next) => {
    let generatedError = err.body, errorCode;
    console.log(generatedError); // Tidak akan selalu ada (output: undefined)

    switch (err.code) {
        case 400:
            errorCode = 'EMPTY_FIELD'; 
            // Terjadi pada saat creation data (sequelize)
            // Login tidak memiliki case 400 
            /* Beralih ke case 401 di mana 'username' atau 'password' tidak sama
             berhubungan data yang dibuat pasti selalu mengikuti 'validation data beforeCreation of sequelize' */

            switch (err.type) {
                case ('register'):
                    switch(err.body.errors[0].path) {
                        case ('username'):
                            res.status(err.code).json({
                                msg: 'Field username tidak boleh kosong',
                                err_code: errorCode
                            })
                            break;
                        case ('password'):
                            res.status(err.code).json({
                                msg: 'Field password tidak boleh kosong',
                                err_code: errorCode
                            })
                            break;
                    }
                    
                case ('todo'):
                    break;
            }
            break;
        case 401:
            errorCode = 'VALIDATION_ERROR';
            res.status(err.code).json({
                msg: 'Username atau password salah',
                err_code: errorCode
            })
            break;
        case 403:
            break;
        case 404:
            break;
        default:
            errorCode = 'INTERNAL_ERROR'
            res.status(err.code || 500).json({
                msg: 'Something went wrong',
                err_code: errorCode
            })
            break;
    }

    // res.render('fail-page');
}