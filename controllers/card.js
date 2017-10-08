const models = require('../models');

var Card = {

  create: function(req, res) {
    var cardFront = req.body.front;
    var cardBack = req.body.back;
    var deckOwner = req.body.deckOwner;
    models.Card.create({
      front: cardFront,
      back: cardBack,
      deckId: deckOwner
    }).then(function(newCard, created) {
      if (!newCard) {
        console.log("Card not created");
        return res.redirect('/viewDecks');
      }
      if (newCard) {
        console.log("created card", newCard);
        return res.redirect('/viewDecks');
      }
  });
},

  manage: function(req, res) {
    models.Deck.findOne({
      where: {
        userId: req.session.passport.user
      }
    }).then(deck => {
    models.Card.findAll({
      where: {
        deckId: deck.id
      }
    }).then(cards => {
      if (cards == null) {
        let noCards = "No cards to manage";
        return res.render('manageCards', {noCards: noCards});
      }
      res.render('manageCards', {cards: cards});
    });
  });
  },

  edit: function(req, res) {
    if (req.body.frontEdit != "") {
      models.Card.update({
        front: req.body.frontEdit
      }, {
        where: {
        id: req.body.hiddenId
      }
      });
    }
    if (req.body.backEdit != "") {
      models.Card.update({
        back: req.body.backEdit
      }, {
        where: {
        id: req.body.hiddenId
      }
      });
    }
    res.redirect('/manageCards');
},

  delete: function(req, res) {
    models.Card.destroy({
      where: {
        id: req.body.hiddenId
      }
    }).then(function() {
      return res.redirect('/manageCards');
    });
},

  newQuiz: function(req, res) {
  models.Card.findAll({ where: { deckId: req.body.hiddenId } }).then(cards => {
    console.log(cards);
    if (!req.session.quizCards || !req.session.answeredCards) {
      req.session.quizCards = [];
      req.session.answeredCards = [];
    } else {
      req.session.quizCards.splice(0);
      req.session.answeredCards.splice(0);
    }
    cards.forEach(function(card) {
      req.session.quizCards.push(card);
    });
    res.render('cardQuiz', {cards: req.session.quizCards, answered: req.session.answeredCards});
  });
},

quiz: function(req, res) {
  res.render('cardQuiz', {cards: req.session.quizCards, answered: req.session.answeredCards});
},

answer: function(req, res) {
  var userAnswer = req.body.userAnswer;
  models.Card.findById(req.body.hiddenId).then(card => {
    let cardFront = card.front;
    let cardBack = card.back;
    function indexGet(element) {
      return element.back == cardBack;
    }
    console.log(cardFront);
    console.log(cardBack);
    if (cardBack == userAnswer) {
      console.log('you got it');
      var correctRes = new String("Correct! Question: " + cardFront + " Answer: " + cardBack);
      console.log(correctRes);
      req.session.answeredCards.push(correctRes);
      let cardIndex = req.session.quizCards.findIndex(indexGet);
      console.log(cardIndex);
        req.session.quizCards.splice(cardIndex, 1);
        return res.redirect('/quiz');
    } else {
      console.log('you did not got it');
      return res.redirect('/quiz');
    }
  });
},

finishQuiz: function(req, res) {
  req.session.quizCards = [];
  req.session.answeredCards = [];
    res.redirect('/viewDecks');
}
};

module.exports = Card;
