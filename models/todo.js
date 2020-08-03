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
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'You don\'t put anything into title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `You have to put something into description`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `You have to put something into status`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'You must input a date'
        },
        isAfter: {
          args: "2020-08-03",
          msg: "You must put a date after 3 August 2020"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  // Todo.addHook('beforeCreate', (user, options) => {
  //   console.log(user.title)
  //   if (!user.title)
  //     throw new Error('You don\'t put anything into title');
  //   if (!user.description)
  //     throw new Error('You don\'t put anything into description');
  //   if (!user.status)
  //     throw new Error('You don\'t put anything into status');
  // });

  return Todo;
};
