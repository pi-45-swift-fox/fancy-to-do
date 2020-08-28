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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    Due_date: DataTypes.DATE
  }, {
    sequelize,
    validate: {
      isExpired(){
        if (this.Due_date < new Date()) {
          throw new Error("Input Tanggal Kadalursa!")
        }
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};