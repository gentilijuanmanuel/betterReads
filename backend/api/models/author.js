var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    dateOfDeath: {type: String},
    gender: { type: String, enum: ['M', 'F'], default: 'M' },
    nationality: {type: String},
    language: {type: String},
    photo: {type: String},
    books: [
        { type: Schema.Types.ObjectId, ref: 'Book' }
    ]
});

module.exports = mongoose.model('Author', authorSchema);