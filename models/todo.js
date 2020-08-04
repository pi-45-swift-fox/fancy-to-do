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
      Todo.belongsTo(models.User, {foreignKey: 'UsersId', targetKey: 'id'});
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'You don\'t put anything into title'
        },
        notNull: {
          args: true,
          msg: 'You have to put something to title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `You have to put something into description`
        },
        notNull: {
          args: true,
          msg: 'You have to put something to description'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `You have to put something into status`
        },
        notNull: {
          args: true,
          msg: 'You have to put something to status'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'You must input a date'
        },
        isAfter: {
          args: "2020-08-03",
          msg: "You must put a date after 3 August 2020"
        },
        notNull: {
          args: true,
          msg: 'You have to put something to date'
        }
      }
    },
    UsersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'You must input an User Id'
        },
        notNull: {
          args: true,
          msg: 'You have to put something to UserId'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};
