var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    isbn: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    description: {type: String},
    image: {type: String, required: true},
    genre: {type: String, enum: ['No ficción', 'Novela', 'Poesía', 'Ensayo', 'Terror', 'Filosofía', 'Policial', 'Fantástico', 'Biografía', 'Autobiografía', 'Diario de viajes'], required: true}
    //reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    //quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
});

module.exports = mongoose.model('Book', bookSchema);