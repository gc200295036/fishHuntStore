const mongoose = require('mongoose')

// schema

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    }
})

// export

module.exports = mongoose.model('Category', categorySchema)
