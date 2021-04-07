// require mongoose
const mongoose = require('mongoose')

// define schema

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    categoryName: {
        type: String,
    }
})

// use module.export productSchema to make public to controller
module.exports = mongoose.model('Product', productSchema)