const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstname:{ required: false, type: String},
    lastname: {required: false, type: String}
})


module.exports = mongoose.model('Users', userModel)