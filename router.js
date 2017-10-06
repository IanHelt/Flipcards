const express = require('express');
const passport = require('passport');
const UserController = require('./controllers/user');
const DeckController = require('./controllers/deck');
const CardController = require('./controllers/card');

module.exports = function(app) {

  const userRouter = express.Router();

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    return next();
    res.redirect('/');
  }
    userRouter.post('/login/', passport.authenticate('local-login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));
    userRouter.get('/signup/', UserController.signup);
    userRouter.post('/signup/', passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup/',
      failureFlash: true
    }));

    userRouter.get('/', UserController.login);
    userRouter.get('/signup', UserController.signup);
    userRouter.get('/logout', UserController.logout);
    userRouter.get('/home', isLoggedIn, UserController.home);
    userRouter.get('/createDeck', isLoggedIn, DeckController.goTo);
    userRouter.post('/createDeck', isLoggedIn, DeckController.create);
    userRouter.get('/viewDecks', isLoggedIn, DeckController.view);
    userRouter.post('/createCard', isLoggedIn, CardController.create);
    userRouter.post('/cardQuiz', isLoggedIn, CardController.newQuiz);
    userRouter.post('/answer', isLoggedIn, CardController.answer);
    userRouter.post('/finishQuiz', isLoggedIn, CardController.finishQuiz);
    userRouter.get('/quiz', isLoggedIn, CardController.quiz);
    userRouter.post('/manageCards', isLoggedIn, CardController.manage);
    userRouter.get('/manageCards', isLoggedIn, CardController.manage);
    userRouter.post('/edit', isLoggedIn, CardController.edit);
    userRouter.post('/delete', isLoggedIn, CardController.delete);



  app.use('/', userRouter);
};
