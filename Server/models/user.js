'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const bcrypt=require('bcrypt')
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
    name: {
      allowNull:false,
      type:DataTypes.STRING,
      validate:{
        notNull:{
          msg:'User not Empty'
        },
        notEmpty:{
          msg:`Need User's Email`
        }
      }
    },
    password: {
      allowNull:false,
      type:DataTypes.STRING,
      validate:{
        notNull:{
          msg:'Password not null'
        },
        notEmpty:{
          msg:'Need Password'
        }
      }
      
    
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate:(instance,options)=>{
        instance.password=bcrypt.hashSync(instance.password,10)

      }
    }
  });
  return User;
};