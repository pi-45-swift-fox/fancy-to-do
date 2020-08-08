'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        notNull : true,
        isEmail: true,
        notEmpty: {
          msg: "email cannot empty",          
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull : true,
        notEmpty: {          
          msg: "passwor cannot empty",
        },
      },
    }
  }, {
    hooks: {
      beforeCreate(user) {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};