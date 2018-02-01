var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    isbn: {type: String, required: true},
    title: {type: String, required: true},
    author: {
        name: {type:String, required:true},
        surname: {type:String, required:true}
    },
    description: {type: String},
    image: {type: String},
    genre: {type: String, enum: ['No ficción', 'Novela', 'Poesía', 'Ensayo', 'Terror', 'Filosofía', 'Policial', 'Fantástico', 'Biografía', 'Autobiografía', 'Diario de viajes'], required: true},
    quotes: [
        {
            quote: {type: String},
            user: { type: String }
        }
    ],
    reviews: [
        {
            stars: {type: Number},
            comment: {type: String},
            user: {type: String}
        }
    ]
});

module.exports = mongoose.model('Book', bookSchema);