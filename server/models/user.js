'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
    type: DataTypes.STRING,        
    allowNull: false,
    validate: {
      isEmail: {
          args: true,
          msg: 'Email address already in use!'
      }}, 
    },
    password:DataTypes.STRING, 
    role: DataTypes.STRING
  }, {
    sequelize,       
    validate: {
      isMoresix(){
        console.log(this.password);
        
        console.log(this.password.length);
        if(this.password.length < 6){
          throw new Error("Password Minimal 6 characters")
        }
      }
    },
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user, options) => {
     const encriptedPs = bcrypt.hashSync(user.password, 10)
     user.password = encriptedPs
  });  
  return User;
};