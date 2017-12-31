var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    dateOfDeath: {type: String},
    gender: { type: String, enum: ['M', 'F'], default: 'M' },
    nationality: {type: String, required: true},
    language: {type: String, required: true},
    ocupation: {type: String, required: true},
    photo: {type: String}
    //reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
    //books: [{type: Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Author', authorSchema);