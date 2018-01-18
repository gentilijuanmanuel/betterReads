const express = require('express');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const router = express.Router();

router.get('/', (req, res, next) => {
    Book.find()
        .select('isbn title author description image')
        .exec()
        .then(bookCollection => {
            const response = {
                count: bookCollection.length,
                books: bookCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'No books found'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .select('isbn title author description image quotes reviews')
        .exec()
        .then(result => {
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(200).json({
                    message: "No book found with that ID"
                });
            }  
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/new', (req, res, next) => {

    var book = new Book({
        isbn: req.body.isbn,
        title: req.body.title,
        author: {
            name: req.body.name,
            surname: req.body.surname
        },
        description: req.body.description,
        image: req.body.image,
        genre: req.body.genre,
    });

    book.save()
        .then(result => {
            res.status(201)
                .json({
                    message: "Book created successfully",
                    createdBook: {
                        _id: result._id,
                        title: result.title,
                    }
                });
        })
        .catch(err => {
            res.status(500)
                .json({
                    error: err
                });
        });
});

router.post('/:id/quote', (req, res, next) => {
    Book.findByIdAndUpdate(
        req.params.id,
        { $push: { "quotes": { quote: req.body.quote } } },
        { safe: true, upsert: true }
    )
    .then(res.status(201).json(
        {
            message: "Quote added successfully"
        }
    ))
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/:id/review', (req, res, next) => {
    Book.findByIdAndUpdate(
        req.params.id,
        { $push: { "reviews": { 
            stars: req.body.stars,
            comment: req.body.comment,
            user: req.body.user 
        } } },
        { safe: true, upsert: true }
    )
        .then(res.status(201).json(
            {
                message: "Review added successfully"
            }
        ))
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;