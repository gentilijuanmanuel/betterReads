var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    gender: { type: String, enum: ['M', 'F'], default: 'M' },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
});

module.exports = mongoose.model('Author', authorSchema);