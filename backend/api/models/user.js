var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    email: {type: String, required: true},
    gender: {type: String, enum:['M', 'F'], default: 'M'}
});

module.exports = mongoose.model('User', userSchema);