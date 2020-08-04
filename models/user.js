const bcrypt = require('bcryptjs');

'use strict';
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
      User.hasMany(models.Todo);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false,
        min: 3,
        max: 24
      }
    },
    password:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false,
        min: 6
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, option) => {
    try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    } catch (error) {
      console.log(err);
    }
  })
  return User;
};