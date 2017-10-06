'use strict';
module.exports = (sequelize, DataTypes) => {
  var Deck = sequelize.define('Deck', {
    name: DataTypes.STRING
  });
  Deck.associate = function (models) {
    Deck.belongsTo(models.User, {foreignKey: 'userId'});
  }
  return Deck;
};
