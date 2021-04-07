var express = require('express');
var router = express.Router();

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
/* get /login */
router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Log In'})
})
// make controller public
module.exports = router;
