const express = require('express');
let Product = require('../models/product');
const router = express.Router();
// import category model 
const Category = require('../models/category')
/* GET /products page. */
router.get('/', (req, res, next) => {
      //
      Product.find((err, products) => {
            if (err) {
                  console.log(err)
            }
            else {
                  res.render('products/index', {
                        title: 'Products!',
                        products: products
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
                        categories: categories
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
module.exports = router;
