var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    isbn: {type: String, required: true},
    title: {type: String, required: true},
    author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
    description: {type: String},
    image: {type: String, required: true},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model('Book', schema);