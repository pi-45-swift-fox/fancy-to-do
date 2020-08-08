const bcrypt = require('bcrypt');

module.exports = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);
    return hash
  },
  checkPassword(password, hashedPass) {
    return bcrypt.compareSync(password, hashedPass)
  },
}