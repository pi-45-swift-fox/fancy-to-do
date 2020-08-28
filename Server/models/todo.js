'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {foreignKey : "userId"})
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Title must be filled"
        },
        notEmpty: {
          args :  true,
          msg : "Blank title input"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Description must be filled"
        },
        notEmpty : {
          args : true,
          msg : "Blank description input"
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type:DataTypes.DATE,
      validate : {
        isDateTrue(date){
          if(date <= new Date()){
            throw new Error('Invalid date input')
          }
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};