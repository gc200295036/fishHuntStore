const express = require('express');
const router = express.Router();

/* GET product page. */
      router.get('/', function(req, res, next) {
      res.render('products/index', {
      title: 'Products',
      productPageText: 'Browse our products!'});
});
module.exports = router;