const bcrypt = require('bcryptjs')
function encode(password){
    return bcrypt.hashSync(password, 10)
}

function decode(currentPassword, hashPassword){
    return bcrypt.compareSync(currentPassword, hashPassword)
}

module.exports = {encode, decode}