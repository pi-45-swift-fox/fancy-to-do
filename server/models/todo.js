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
      Todo.belongsTo(models.User, {foreignKey: "UserId"}) //ini di todo
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: "Please input title for your todo list!"
          },
          notEmpty: {
              msg: "Please input title for your todo list!"
          }
      }
  },
  description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: "Please input description for your todo list!"
          },
          notEmpty: {
              msg: "Please input description for your todo list!"
          }
      }
  },
  status: DataTypes.BOOLEAN,
  dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
          compareDate(value) {
              if (value <= new Date()) throw new Error('Validation error. Due date must be after today!')
          },
          notNull: {
              msg: "Please input due date for your todo list!"
          },
          notEmpty: {
              msg: "Please input due date for your todo list!"
          }
      }

  },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks : {
      beforeCreate: (todo) => {
        todo.status = false
      }
    }
  });
  return Todo;
};