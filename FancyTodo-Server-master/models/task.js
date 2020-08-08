'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    description: DataTypes.TEXT,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'due_date cannot be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};