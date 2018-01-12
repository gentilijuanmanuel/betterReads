const express = require('express');
const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const router = express.Router();


//return all the reviews
router.get('/', (req, res, next) => {
    Book.find()
        .exec()
        .then(reviewCollection => {
            const response = {
                count: reviewCollection.length,
                books: reviewCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'No reviews found'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


//return reviews of a book

router.get('/book/:idBook', (req, res, next) => {
    let idBook = req.params.idBook;

    Book.find({ book: idBook })
        .exec()
        .then(reviewCollection => {
            const response = {
                count: reviewCollection.length,
                books: reviewCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'This book does not have any review'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


//return reviews of an author

router.get('/author/:idAuthor', (req, res, next) => {
    let idAuthor = req.params.idAuthor;

    Book.find({ author: idAuthor })
        .exec()
        .then(reviewCollection => {
            const response = {
                count: reviewCollection.length,
                books: reviewCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'This author does not have any review'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


//return reviews of a book

router.get('/user/:idUser', (req, res, next) => {
    let idUser = req.params.idUser;

    Book.find({ user: idUser })
        .exec()
        .then(reviewCollection => {
            const response = {
                count: reviewCollection.length,
                books: reviewCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'This user does not have any review'
                });
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: err
                });
        });
});


//post a review

router.post('/new', (req, res, next) => {
    let book = req.body.book;
    let author = req.body.author;
    let stars = req.body.stars;
    let description = req.body.description;
    let user = req.body.user;

    var review = new Review({
        book: book,
        author: author,
        stars: stars,
        description: description,
        user: user
    });

    review.save((err, book) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send("Review submitted \n" + review);
    });

    review.save()
          .then(result => {
            console.log(result);
            res.status(201)
               .json({
                   message: "Review created successfully",
                   createdBook: {
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


//update a review

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
  
    const updateArray = {}
  
    for (const ops of req.body) {
      updateArray[ops.change] = ops.value;
    }
  
    Review.update({ _id: id }, { $set: updateArray })
      .exec()
      .then(result => {
  
        if (result.nModified) {
          res.status(200).json({
            status: result.ok,
            changed: result.nModified,
            message: 'Review updated successfully'
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


//delete a review

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Review.remove({ _id: id })
          .exec()
          .then(result => {
                const response = {
                count: result.result.n,
                status: result.result.ok,
                message: 'Review deleted successfully'
            }
            if (result.result.n) {
                res.status(200).json(response);
            }
            else {
                response.message = 'No review was deleted';
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