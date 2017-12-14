var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    stars: {type: Number, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Review', reviewSchema);