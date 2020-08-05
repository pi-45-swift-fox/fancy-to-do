'use strict';
const {
  Model
} = require('sequelize');
//const { error } = require('cli');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User,{foreignKey:'UserId'})
    }
  };
  Todo.init({
    title: {
      allowNull:false,
      type:DataTypes.STRING, 
      validate:
      {
        notNull:{
          msg:'Please enter the Title'
        }
    }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Please enter the Description'
        }
      }},
    status: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Please enter the Status'
        }
      }},
    due_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Please enter the due_date'
        },
        checkDate(value){
          if(value>new Date()){
            return (`Date should not higher than today's date`)
          }
        }
      }
    },
    UserId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks:{
      beforeUpdate:(instance,options)=>{
        if(instance.due_date===undefined){
          instance.due_date=new Date()
        }
      }
    }
  });
  return Todo;
};