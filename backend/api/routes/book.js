const express = require('express');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const router = express.Router();


//return all the books
router.get('/', (req, res, next) => {
    Book.find()
        .select('isbn title author description reviews quotes')
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


//return a book

router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .select('isbn title author description reviews quotes')
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


//return books of an author

router.get('/author/:idAuthor', (req, res, next) => {
    let idAuthor = req.params.idAuthor;

    Book.find({ author: idAuthor })
        .select('isbn title author description reviews quotes')
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
                    message: 'This author does not have any book'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


//return books of an specific genre

router.get('/genre/:genre', (req, res, next) => {
    let genre = req.params.genre;

    Book.find({ genre: genre })
        .select('isbn title author description reviews quotes')
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
                    message: 'This genre does not have any book'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


//post a book

router.post('/new', (req, res, next) => {
    let isbn = req.body.isbn;
    let title = req.body.title;
    let author = req.body.author;
    let description = req.body.description;
    let image = req.body.image;
    let reviews = req.body.reviews;
    let quotes = req.body.quotes;

    var book = new Book({
        isbn: isbn,
        title: title,
        author: author,
        description: description,
        reviews: reviews,
        quotes: quotes
    });

    book.save()
        .then(result => {
            console.log(result);
            res.status(201)
               .json({
                   message: "Book created successfully",
                   createdBook: {
                       _id: result._id,
                       title: result.title
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


//update a book

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
  
    const updateArray = {}
  
    for (const ops of req.body) {
      updateArray[ops.change] = ops.value;
    }
  
    Book.update({ _id: id }, { $set: updateArray })
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


//delete a book

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Book.remove({ _id: id })
      .exec()
      .then(result => {
  
        const response = {
          count: result.result.n,
          status: result.result.ok,
          message: 'Book deleted successfully'
        }
  
        if (result.result.n) {
          res.status(200).json(response);
        }
        else {
          response.message = 'No book was deleted';
          res.status(200).json(response);
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
});


module.exports = router;