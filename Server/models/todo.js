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
      Todo.belongsTo(models.User)
    }
  };

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          args: true,
          msg : 'Title needs to be filled'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          args: true,
          msg : 'Description needs to be filled'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    Due_date: {
      type: DataTypes.DATE,
      validate : {
        // isAfter : {
        //   args : `${new Date()}`,
        //   msg: 'MASUK'
        // }
        isDate(value){
          if(value <= new Date()){
            throw new Error('Tanggal tidak boleh kurang dari hari ini')
          }
        }
      }
    },
    UserId:{
      type : DataTypes.INTEGER,
      // validate : {
        
      // }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};