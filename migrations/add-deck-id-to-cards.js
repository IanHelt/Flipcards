'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Cards',
      'deckId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Decks',
          key: 'id'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Cards', 'deckId');
  }
};
