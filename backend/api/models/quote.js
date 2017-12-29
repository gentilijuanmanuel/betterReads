var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quoteSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book'},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Quote', quoteSchema);