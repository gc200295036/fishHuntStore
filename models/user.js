const mongoose = require('mongoose')
//use installed npm file passport-local-mongoose and add reference
const plm = require('passport-local-mongoose')
// create userSchema
const userSchema = new mongoose.Schema({
    login: String,
    passcode: String,
    // external login 
    oauthId: String,
    oauthProvider: String,
    created: Date
})
userSchema.plugin(plm)
// export
module.exports = mongoose.model('User', userSchema)

