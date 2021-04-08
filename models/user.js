const mongoose = require('mongoose')
//use installed npm file passport-local-mongoose and add reference
const plm = require('passport-local-mongoose')
// create userSchema
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    // external login 
    oauthId: String,
    oauthProvider: String,
    created: Date
})
userSchema.plugin(plm)
// export
module.exports = mongoose.model('User', userSchema)

