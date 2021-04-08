var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories')

// dbConfiguration file
let config = require('./dbConfiguration/database')
//dbConfiguration/database file now stored as 'config' variable.
// config.database so that my connection string isn't hard coded in app.js

const passport = require('passport')
const session = require('express-session')
//github login local strategy
const gitHubStrategy = require('passport-github2').Strategy
var app = express();

// require mongoose
const mongoose = require('mongoose')

mongoose.connect(config.db,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((res) => {
  console.log('CONNECTION SUCCESS! using fishHuntStore database @ MongoDB')
  }).catch(() => {
  console.log('CONNECTION FAILED! no connection to fishHuntStore database @ MongoDB')
  })

  // hbs helper function that pre-selects the correct dropdown data
const hbs = require('hbs')
hbs.registerHelper('createOption', (currentValue, selectedValue) => {
  var selectedProperty = ''
  if (currentValue == selectedValue) {
     selectedProperty = 'selected'
  }
  return new hbs.SafeString('<option' + selectedProperty + '>' + currentValue + '</option>')
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport configuration 
//needs to be configured before the controllers are mapped so the controllers can use passport
app.use(session({
  secret: 'fishHuntStoreSecret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// link passport to user model
const User = require('./models/user')
passport.use(User.createStrategy())

//passport-github2 authentication - external github login
passport.use(new gitHubStrategy({
  clientID: config.github.clientId,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
},
  // after github logs in, register or login user
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ oauthId: profile.id })
    if (user) {
      return done(null, user)
    }
    else {
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github External Login',
        created: Date.now()
      })
      const savedUser = await newUser.save()
      done(null, savedUser)
    }
  }
))

// passport read/write user data
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
