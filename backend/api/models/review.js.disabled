var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book'},
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    stars: {type: Number, required: true},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Review', reviewSchema);