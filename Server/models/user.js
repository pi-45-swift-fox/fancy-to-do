'use strict';
const {encode} = require('../helpers/bcrypt')

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
      User.hasMany(models.Todo, {foreignKey : "userId"})

    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          args :true,
          msg : 'Invalid Email'
        },
        notEmpty :{
          msg: 'Email must be filled'
        },
        notNull : {
          msg : 'Email must be filled'
        },
        async isEmailExist(email){
          let str = ''
          for (let i = 0; i < email.length; i++) {
            str += email[i]
          }
          const user = await User.findOne({where: {email : str}})
          if(user){
            throw new Error('Email already registered')
          }
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      notEmpty : {
        args : true,
        msg : "Password must be filled"
      },
      validate : {
        isPasswordLength(password) {
          let count = 0
          for (let i = 0; i < password.length; i++) {
            count ++
          }
          if(count < 6 ){
            throw new Error('Password required 6 character');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user,option)=>{
    encode(user.password)
    user.password = encode(user.password)
  })
  return User;
};