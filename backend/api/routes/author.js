const express = require('express');
const mongoose = require('mongoose');
const Author = mongoose.model('Author');
const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    Author.find()
        .select('name surname gender books')
        .exec()
        .then(authors => {
            const response = {
                count: authors.length,
                authors: authors
            }
            if (response.count) {
                res.status(200)
                    .json(response);
            } else {
                res.status(200)
                    .json({
                        message: 'No authors found'
                    });
            }
        })
        .catch(err => {
            res.status(500)
                .json({
                    error: err
                });
        });
});

router.get('/:id', (req, res, next) => {
    Author.findById(req.params.id)
        .select('name surname dateOfBirth gender books quotes reviews')
        .populate('books')
        .populate('quotes')
        .populate('reviews')
        .exec()
        .then(auth => {
          if(auth) {
            res.status(200).json(auth);
          } else {
            res.status(200).json({
              message: 'No author found with that ID'
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
    const author = new Author({
        name: req.body.name,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        reviews: req.body.reviews,
        books: req.body.books,
        quotes: req.body.quotes
    });

    author.save()
        .then(result => {
            console.log(result);
            res.status(201)
                .json({
                    message: "Author created successfully",
                    createdAuthor: {
                        _id: result._id,
                        name: result.name + ' ' + result.surname,
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

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;

  const updateArray = {}

  for (const ops of req.body) {
    updateArray[ops.change] = ops.value;
  }

  Author.update({ _id: id }, { $set: updateArray })
    .exec()
    .then(result => {

      if (result.nModified) {
        res.status(200).json({
          status: result.ok,
          changed: result.nModified,
          message: 'Author updated successfully'
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

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Author.remove({ _id: id })
    .exec()
    .then(result => {

      const response = {
        count: result.result.n,
        status: result.result.ok,
        message: 'Author deleted successfully'
      }

      if (result.result.n) {
        res.status(200).json(response);
      }
      else {
        response.message = 'No author was deleted';
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