const express = require('express');
let Product = require('../models/product');
const router = express.Router();


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

/*GET products/create */
router.get('/add', (req, res, next) => {
      res.render('products/add', {title: 'Create Product'})
})
/*POST /products/add */
// 
router.post('/add', (req, res, next) => {
      let Product = require('../models/product')
      Product.create({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity
      }, (err, newProduct) => {
            if (err) {
                  console.log(err)
            }
            else {
                  res.redirect('/products')
            }
      })
})
module.exports = router;
