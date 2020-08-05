'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate (models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title must be filled out.'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description Title must be filled out.'
        }
      }
    },
    status: {
      type: DataTypes.STRING
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isValid(due_date) {
          console.log('object');
          if (new Date(due_date) < new Date()) {
            throw new Error('Due date must be atleast now.');
          }
        },
        isDate: {
          msg: 'Wrong date format.'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
  }, {
    hooks: {
      beforeCreate: (todo, options) => {
        todo.status = "undone"
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};