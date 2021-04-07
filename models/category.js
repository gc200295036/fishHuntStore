const mongoose = require('mongoose')

// schema

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// export

module.exports = mongoose.model('Category', categorySchema)
