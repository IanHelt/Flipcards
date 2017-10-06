'use strict';
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define('Card', {
    front: DataTypes.STRING,
    back: DataTypes.STRING
  });
  Card.associate = function (models) {
    Card.belongsTo(models.Deck, {foreignKey: 'deckId'});
  }
  return Card;
};
