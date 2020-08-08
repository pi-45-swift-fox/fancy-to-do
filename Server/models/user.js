'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid Email'
        }
      }
    },
    password: {
      type: DataTypes.STRING
      // validate : {
      //   isPasswordGood(password){
      //     if(password.length<=6){
      //       throw new Error('Password requires 6 characters')
      //     }
      //   }
      // }
    },
    role: DataTypes.STRING},{
    sequelize,
    modelName: 'User',
  })
  User.beforeCreate((user, option) =>{
    user.password = bcrypt.hashSync(user.password, 8)
  });
  return User;
};