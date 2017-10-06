const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const session = require('express-session');
const flash = require('express-flash-messages');
const passport = require('passport');
const bodyParser = require('body-parser');
const models = require('./models');
const routes = require('./router');
const app = express();

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
app.engine('handlebars', exphbs({
  defaultLayout: 'index'
}));
app.set('view engine', 'handlebars');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
require('./controllers/passport');
app.use(session({
  secret: 'chimp',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes(app);

app.listen(process.env.PORT || 3000);

module.exports = app;
