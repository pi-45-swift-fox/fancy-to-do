'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Todos', 'Due_date', {
      type: Sequelize.DATE,
      validate: {
        isExpired(value){
          if (value < new Date()) {
            throw new Error("Input Tanggal Kadalursa!")
          }
        }
      }})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Todos', 'Due_date')
  }
};
