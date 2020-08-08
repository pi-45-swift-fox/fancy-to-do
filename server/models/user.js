'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../helpers/Helper')
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
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'please enter your email'
        },
        isEmail: {
          args: true,
          msg: 'incorrect email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, Infinity],
          msg: 'password need a minimum of 6 characters'
        }
      }
    }    
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user, options)=>{
    user.password = Helper.encoder(user.password)
  })

  return User;
};