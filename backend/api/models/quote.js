var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    titleOfTheBook: {type: string, required: true}, //no sé si esto está bien
    description: {type: string, required: true}
});

module.exports = mongoose.model('Quote', schema);