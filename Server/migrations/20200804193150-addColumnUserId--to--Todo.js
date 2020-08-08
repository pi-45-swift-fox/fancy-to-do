'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos','UserId',{
      type:Sequelize.INTEGER,
      references:{
        model:'Todos',
        key:'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos','UserId',{})
  }
};
