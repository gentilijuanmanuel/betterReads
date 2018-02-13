const express = require('express');
const mongoose = require('mongoose');
const Author = mongoose.model('Author');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, true);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 //50 megabytes como máximo, para el tamaño de la imagen.
  },
  fileFilter: fileFilter
}).single('file'); //CAMBIO

const ObjectId = mongoose.Types.ObjectId;

//RUTA PARA SUBIR IMAGEN
router.post('/upload', function(req, res, next){
  upload(req, res, function(err) {
    if(err) {
      return res.status(501).json({error: err});
    }

    return res.json({ originalname: req.file.originalname, uploadname: req.file.filename })
  });
});


router.get('/', (req, res, next) => {
    Author.find()
        .select('name surname dateOfBirth dateOfDeath quotes language ocupation nationality photo likes')
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

router.get('/popular', (req, res, next) => {
  Author.find({ likes: { $gt: 10 } })
      .select('name surname dateOfBirth dateOfDeath quotes language ocupation nationality photo likes')
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


//CAMBIO
router.post('/new', checkAuth, /* upload.single('photo'), */ (req, res, next) => {
    const author = new Author({
      name: req.body.name,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath,
      nationality: req.body.nationality,
      language: req.body.language,
      photo: "http://localhost:3000/" + req.body.photo,
      gender: req.body.gender,
      ocupation: req.body.ocupation
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

    /*
    author.save((err, author) => {
      if (err) {
          res.status(500).send(err);
      }
      res.status(200).send("Author submitted \n" + author);
    });*/
    
});

router.patch('/:id', checkAuth, (req, res, next) => {

  const updateObject = {
    dateOfBirth: req.body.dateOfBirth,
    dateOfDeath: req.body.dateOfDeath,
    gender: req.body.gender,
    nationality: req.body.nationality,
    language: req.body.language,
    ocupation: req.body.ocupation
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
    { $addToSet: { "books": req.params.idbook }},
    { safe: true, upsert: true }
  )
  .then(res.status(201)
    .json({
        message: "Book added successfully"
    }))
  .catch(err => {
    res.status(500)
        .json({
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

router.post('/:id/quote', checkAuth, (req, res, next) => {
  Author.findByIdAndUpdate(
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


router.post('/:id/review', checkAuth, (req, res, next) => {
  Author.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        "reviews": {
          stars: req.body.stars,
          comment: req.body.comment,
          user: req.body.user
        }
      }
    },
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

router.patch('/like/:id', checkAuth, (req, res, next) => {

  const updateObject = {
      likes: req.body.likes
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


module.exports = router;