var User = {
  login: function(req, res) {
    res.render('login/login', {
      messages: res.locals.getMessages()
    });
  },

  logout: function(req, res) {
    req.session.destroy(function(err){
      res.redirect('/');
    });
  },

  signup: function(req, res) {
    res.render('login/signup', {
      messages: res.locals.getMessages()
    });
  },

  home: function(req, res) {
    res.render('home');
  }
};

module.exports = User;
