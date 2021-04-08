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
/*get /logout */
router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/login')
})
/*get /github */
router.get('/github', passport.authenticate('github', {
  scope:['user.email']}))

/* get github/callback */
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login'
}),
  (req, res, next) => {
    res.redirect('/products')
  })

//make controller public
module.exports = router;
