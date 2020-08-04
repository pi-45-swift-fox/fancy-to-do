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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};