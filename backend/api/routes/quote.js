const express = require('express');
const mongoose = require('mongoose');
const Quote = mongoose.model('Quote');
const router = express.Router();


//return all the quotes
router.get('/', (req, res, next) => {
    Quote.find()
        .exec()
        .then(quoteCollection => {
            const response = {
                count: quoteCollection.length,
                books: quoteCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'No quotes found'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


//return a quote

router.get('/:quoteId', (req, res, next) => {
    const id = req.params.quoteId;

    Quote.findById(id)
        .exec()
        .then(result => {
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(200).json({
                    message: "No quote found with that ID"
                });
            }  
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


//return quotes of a book VERRRRRR

router.get('/book/:idBook', (req, res, next) => {
    let idBook = req.params.idBook;

    Quote.find({ book: idBook })
        .exec()
        .then(quoteCollection => {
            const response = {
                count: quoteCollection.length,
                books: quoteCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'This book does not have any quote'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});

//return quotes of an user VERRRRRR

router.get('/book/:idUser', (req, res, next) => {
    let idUser = req.params.idUser;

    Quote.find({ user: idUser })
        .exec()
        .then(quoteCollection => {
            const response = {
                count: quoteCollection.length,
                books: quoteCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'This user does not have any quote'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


//post a quote

router.post('/new', (req, res, next) => {
    let book = req.body.book;
    let description = req.body.description;

    var quote = new Quote({
        book: book,
        description: description
    });

    quote.save()
        .then(result => {
            console.log(result);
            res.status(201)
               .json({
                   message: "Quote created successfully",
                   createdQuote: {
                       _id: result._id,
                       description: result.description
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

//update a quote VERRRRRR

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
  
    const updateArray = {}
  
    for (const ops of req.body) {
      updateArray[ops.change] = ops.value;
    }
  
    Quote.update({ _id: id }, { $set: updateArray })
      .exec()
      .then(result => {
  
        if (result.nModified) {
          res.status(200).json({
            status: result.ok,
            changed: result.nModified,
            message: 'Quote updated successfully'
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


//delete a quote

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Quote.remove({ _id: id })
      .exec()
      .then(result => {
  
        const response = {
          count: result.result.n,
          status: result.result.ok,
          message: 'Quote deleted successfully'
        }
  
        if (result.result.n) {
          res.status(200).json(response);
        }
        else {
          response.message = 'No quote was deleted';
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