const models = require('../models');

var Deck = {

  goTo: function(req, res) {
    res.render('createDeck')
  },

  create: function(req, res) {
    var deckName = req.body.name;
    var deckUser = req.session.passport.user;
    models.Deck.create({
      name: deckName,
      userId: deckUser
    }).then(function(newDeck, created) {
      if (!newDeck) {
        console.log("deck not created");
        return res.redirect('/createDeck');
      }
      if (newDeck) {
        console.log("created deck", newDeck);
        return res.redirect('/home');
      }
  });
},

  view: function(req, res) {
    models.Deck.findAll({ where: { userId: req.session.passport.user } }).then(results => {
      console.log(results);
      return res.render('viewDeck', { decks : results });
    });
  }
};
module.exports = Deck;
