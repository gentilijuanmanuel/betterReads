const express = require('express');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const Author = mongoose.model('Author');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

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

router.post('/new', checkAuth, (req, res, next) => {

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
            Author.findOne({ name: result.author.name, surname: result.author.surname })
                .exec()
                .then(author => {
                    if(author) {
                        author.books.push(result._id);
                        author.save()
                            .then(
                                res.status(201)
                                    .json({
                                        message: "Book created successfully and added to author",
                                        createdBook: {
                                            _id: result._id,
                                            title: result.title,
                                            author: author._id
                                        }
                                    })
                            )
                            .catch(err => {
                                res.status(500)
                                    .json({
                                        error: err
                                    });
                            });
                    }
                    else {
                        res.status(201)
                            .json({
                                message: "Book created successfully",
                                createdBook: {
                                    _id: result._id,
                                    title: result.title,
                                }
                            });
                    }

                })
                .catch(err => {
                    res.status(500)
                        .json({
                            error: err
                        });
                });
        })
        .catch(err => {
            res.status(500)
                .json({
                    error: err
                });
        });
});

router.post('/:id/quote', checkAuth, (req, res, next) => {
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

router.patch('/:id', checkAuth, (req, res, next) => {

    const updateObject = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        genre: req.body.genre,
    }

    Book.update({ _id: req.params.id }, { $set: updateObject })
        .exec()
        .then(result => {

            if (result.nModified) {
                res.status(200).json({
                    status: result.ok,
                    changed: result.nModified,
                    message: 'Book updated successfully'
                });
            }
            else {
                res.status(200).json({
                    status: result.ok,
                    changed: result.nModified,
                    message: 'No attributes were affected. Please check change and value attributes of your request.'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;