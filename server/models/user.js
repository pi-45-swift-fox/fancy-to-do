'use strict';
const { generate } = require('../helpers/bcrypt')
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
      unique: {
        args: true,
        msg: 'Email already Exist.'
      },
      isEmail: true,
      allowNull: false,
      validate: {
          notNull: {
              args: true,
              msg: 'Email required.'
          },
          isEmail: {
            args: true,
            msg: "Invalid Email Input."
          }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
              args: true,
              msg: 'Password Required.'
          },
          len: {
              args: [4, 18],
              msg: 'Password length must between 4 or 18 Characters.'
          }
      }
    },  
  }, {
    hooks: {
      beforeCreate(user) {
          user.password = generate(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};