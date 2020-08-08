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
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'fill in the password'
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'fill in your firstname'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'fill in your lastname'
        }
      }
    },
    birthOfDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'fill in your birth date'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};