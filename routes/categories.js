const express = require('express')
const router = express.Router()

// add model for crud
let Category = require('../models/category')

//require passport
let passport = require('passport')

//logged in function does an authentication check for user to allow create/edit/delete - works like asp.net Authorize tag when using loggedIn infront of a view products/add
function loggedIn(req, res, next) {
      if (req.isAuthenticated()) {
            return next() // return next 
      }
      res.redirect('/login') // redirects anon user who tries to access the create, edit delete page
 }

/*GET categories/add*/
router.get('/add', loggedIn,(req, res, next) => {
    res.render('categories/add', {
        title: 'Add a Category',
        user: req.user
    })
})
/* post /categories/add */
router.post('/add', loggedIn,(req, res, next) => {
    Category.create({
        categoryName: req.body.categoryName
    }, (err, newCategory) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})
// make public
module.exports = router;