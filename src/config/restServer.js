const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const flash = require('connect-flash');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userQueries = require('../concepts/users/repositories/queries');
const isValidPassword = require('../concepts/users/useCases/isValidPassword');
const userRouter = require('../concepts/users/routes');
const taskRouter = require('../concepts/tasks/routes');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (username, password, done) => {
  return userQueries.findUserByEmail(username)
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!isValidPassword.isValidPassword(user, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .catch((err) => done(err));
}));

// serialize and deserialize user instances to and from the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return userQueries.findUserById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});


function startRestServer() {
  const app = express();

  app.use(express.urlencoded());

  // adding Helmet to enhance your API's security
  app.use(helmet());

  // parse JSON bodies into JS objects
  app.use(express.json());

  // enabling CORS for all requests
  app.use(cors());

  // TODO: Move to .env
  app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
  }));

  app.use(flash());

  // adding morgan to log HTTP requests
  app.use(morgan('combined'));

  app.use(passport.initialize());
  app.use(passport.session());

  app.set('view engine', 'pug');
  app.set('views', './src/views');

  app.use('/users', userRouter);
  app.use('/tasks', taskRouter);

  // Auth
  app.post('/login',
    // passport.authenticate() middleware invokes req.login() automatically
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: 'Invalid username or password.',
      successFlash: 'Welcome!',
    }));

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.use((req, res) => {
    res.status(404).send("Sorry can't find that!");
  });

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(400).json({ success: false, error });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

module.exports = {
  startRestServer,
};
