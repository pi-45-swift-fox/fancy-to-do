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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          // args: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()+1}`,
          // args: new Date(),
          args: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()-1}`,
          msg: 'Tanggal harus sebelum hari ini'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};