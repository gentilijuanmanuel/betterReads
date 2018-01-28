const express = require('express');
const mongoose = require('mongoose');
const Author = mongoose.model('Author');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ObjectId = mongoose.Types.ObjectId;

/*
router.get('/', (req, res, next) => {
    Author.find()
        .select('name surname gender')
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
*/

router.get('/', (req, res, next) => {
  Author.find({}).then(authors =>{
    if (!authors) { return res.sendStatus(401); }
    return res.json(authors) 
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
    Author.findById(req.params.id)
      .select('name surname dateOfBirth dateOfDeath nationality language photo gender')
      .populate('books')
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

router.post('/new', checkAuth, (req, res, next) => {
    const author = new Author({
      name: req.body.name,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath,
      nationality: req.body.nationality,
      language: req.body.language,
      photo: req.body.photo,
      gender: req.body.gender
    });

    author.save()
        .then(result => {
            res.status(201)
                .json({
                    message: "Author created successfully",
                    createdAuthor: {
                        _id: result._id,
                        name: result.name,
                        surname: result.surname
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

router.patch('/:id', checkAuth, (req, res, next) => {

  const updateObject = {
    dateOfDeath: req.body.dateOfDeath,
    nationality: req.body.nationality,
    language: req.body.nationality
  }

  Author.update({ _id: req.params.id }, { $set: updateObject })
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

router.delete('/:id', checkAuth, (req, res, next) => {
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
        response.message = 'No user was deleted';
        res.status(200).json(response);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/:id/add/:idbook', checkAuth, (req, res, next) => {
  Author.findByIdAndUpdate(
    req.params.id,
    { $push: { "books": req.params.idbook }},
    { safe: true, upsert: true }
  )
    .then(res.status(201).json(
      {
        message: "Book added successfully"
      }
    ))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/:id/remove/:idbook', checkAuth, (req, res, next) => {
  Author.findByIdAndUpdate(
    req.params.id,
    { $pull: { "books": req.params.idbook } },
    { safe: true, upsert: true }
  )
    .then(res.status(201).json(
      {
        message: "Book removed successfully"
      }
    ))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;