var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    titleOfTheBook: {type: String, required: true}, //no sé si esto está bien
    description: {type: String, required: true}
});

module.exports = mongoose.model('Quote', schema);