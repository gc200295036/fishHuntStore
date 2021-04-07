var express = require('express');
var router = express.Router();

// user model authentication
const User = require('../models/user')
const passport = require('passport')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home',
    pageGreeting: 'Welcome!'  });
});

/* get /signup */
router.get('/signup', (req, res, next) => {
  res.render('signup', {title: 'Create Account'})
})
/* post /signup */
router.post('/signup', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, newUser) => {
    if (err) {
      return res.redirect('/signup')
    } else {
      // login the user automatically
      req.login(newUser, (err) => {
        res.redirect('/products')
      })
    }
  })
})
/* get /login */
router.get('/login', (req, res, next) => {
  //check login error messages and display error message if an error occurs
  let messages = req.session.messages || [];
  req.session.messages = []; // clear messages with empty array
  res.render('login', {
    title: 'Log In',
    messages: messages
  })
})

/* post /login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/products',
  failureRedirect: '/login',
  failureMessage: 'Unable to Login, Try Again or Sign Up'
}))
//make controller public
module.exports = router;
