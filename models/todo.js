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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type:DataTypes.DATE,
      validate:{
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