const express = require('express')
const router = express.Router()

// add model for crud
let Category = require('../models/category')

//require passport
let passport = require('passport')

/*GET categories/add*/
router.get('/add', (req, res, next) => {
    res.render('categories/add', {
        title: 'Add a Category',
        user: req.user
    })
})
/* GET /categories/add */
router.post('/add', (req, res, next) => {
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