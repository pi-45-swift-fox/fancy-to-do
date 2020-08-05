'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already registered'
      },
      validate: {
        isEmail: {
          msg: 'Invalid email format'
        },
        notEmpty: {
          msg: 'Email can\'t be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Password must be 6 character or longer'
        },
        notEmpty: {
          msg: 'Password can\'t be empty'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate (User) {
        User.password = hashPassword(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};