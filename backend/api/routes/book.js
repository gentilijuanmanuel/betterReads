const express = require('express');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const Author = mongoose.model('Author');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
    Book.find()
        .select('isbn title author description image reviews quotes genre')
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

router.get('/genre/:genre', (req, res, next) => {  
    Book.find({ 'genre': req.params.genre })
        .then(books =>{
            if (!books) { return res.sendStatus(401); }
            return res.json(books) 
            }
        )
        .catch(next);
  });

router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
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
        .then(book => {
            Author.findOneAndUpdate(
                { name: book.author.name, surname: book.author.surname },
                { $push: { "books": book.id } },
            )
            .then(author => {
                if(author) {
                    res.status(201).json({
                        message: "Book created successfully and added to author",
                        code: 1,
                        id: book.id,
                        author: author._id
                    });
                } else {
                    res.status(201).json({
                        message: "Book created successfully",
                        code: 2,
                        id: book.id
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

router.post('/quote/:id',  checkAuth, (req, res, next) => {
    Book.findByIdAndUpdate(
        req.params.id,
        { $push: { "quotes": 
            { 
                quote: req.body.quote,
                user: req.body.user  
            } 
        } },
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

router.post('/review/:id', (req, res, next) => {
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
        isbn: req.body.isbn,
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre
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
});

router.patch('/like/:id', checkAuth, (req, res, next) => {

    const updateObject = {
        likes: req.body.likes
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
});

module.exports = router;