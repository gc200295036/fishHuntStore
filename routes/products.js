// require express
const express = require('express');
//product model stored into a variable
let Product = require('../models/product');
//enable routing
const router = express.Router();
// import category model 
const Category = require('../models/category')
// require passport for authentication
const passport = require('passport')
/* GET /products page. */
router.get('/', (req, res, next) => {
      //
      Product.find((err, products) => {
            if (err) {
                  console.log(err)
            }
            else {
                  //show current user in navbar using user:req.user
                  res.render('products/index', {
                        title: 'Products!',
                        products: products,
                        user: req.user
                  })
            }
      })
});

/*GET products/add */
router.get('/add', (req, res, next) => {
      // fetch Category model to display list for dropdown menu
      Category.find((err, categories) => {
            if(err) {
                  // if error, log that error.
                  console.log(err)
            } 
            else {
                  res.render('products/add', {
                        title: 'Product Details',
                        categories: categories,
                        user: req.user
                  })
            }
            //Sorts dropdown list alphabetically
      }).sort({categoryName:1})

      // res.render('products/add', {title: 'Create Product'})
})
/*POST /products/add */
// 
router.post('/add', (req, res, next) => {
      let Product = require('../models/product')
      Product.create({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            categoryName: req.body.categoryName
      }, (err, newProduct) => {
            if (err) {
                  console.log(err)
            }
            else {
                  res.redirect('/products')
            }
      })
})
/*GET /products/remove/ */
router.get('/remove/:_id', (req, res, next) => {
      // Product model remove method
      Product.remove({ _id: req.params._id }, (err) => {
            if (err) {
                  console.log(err)
            }
            else {
                  res.redirect('/products')
            }
      })
})

/* GET /products/edit */
router.get('/edit/:_id', (req, res, next) => {
      Product.findById(req.params._id, (err, product) => {
            if (err) {
                  console.log(err)
            }
            else {
                  // categories dropdown
                  Category.find((err, categories) => {
                        if (err) {
                              console.log(err)
                        }
                        else {
                        res.render('products/edit', {
                        title: 'Product Edit',
                        product: product,
                        categories: categories,
                        user: req.user
                        })
                  }
               }).sort({ categoryName: 1})
            }
      })
})

/* POST /products/edit */
router.post('/edit/:_id', (req, res, next) => {
      Product.findOneAndUpdate({ _id: req.params._id }, {
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            categoryName: req.body.categoryName
      }, (err, product) => {
            if (err) {
                  console.log(err)
            }
            else {
                  res.redirect('/products')
            }
      
      })
})
//make public
module.exports = router;
