var express = require('express');
var router = express.Router();

// user model authentication
const User = require('../models/user')

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
  res.render('login', {title: 'Log In'})
})
// make controller public
module.exports = router;
