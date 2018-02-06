const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    User.find()
        .select('name surname email library')
        .exec()
        .then(userCollection => {
            const response = {

                count: userCollection.length,
                users: userCollection
            }

            if (response.count) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'No users found'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;

    User.findById(id)
        .select('email name surname dateOfBirth gender library')
        .populate('library')
        .exec()
        .then(result => {
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(200).json({
                    message: "No user found with that ID"
                });
            }  
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/signup', (req, res, next) => {

    User.find({'email': req.body.email})
        .exec()
        .then(user => {

            if(user.length>0)
            {
                return res.status(409).json({
                    message: "The email has already been taken"
                });

            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });

                    } else {

                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            surname: req.body.surname,
                            dateOfBirth: req.body.dateOfBirth,
                            gender: req.body.gender
                        });

                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: "User created successfully",
                                    createdUser: {
                                        _id: result._id,
                                        email: result.email
                                    }
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }

                });
            }
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if(user === null) {
                res.status(401).json({
                    message: 'Authentication failed.'
                });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(function (result) {
                        if (result) {
                            const token = jwt.sign({
                                email: user.email,
                                id: user.id
                            },
                            "asupersecretprivatekey:)",
                            {
                                expiresIn: '5h'

                            });

                            res.status(200).json({
                                message: 'Authentication success.',
                                token: token,
                                id: user.id,
                                name: user.name,
                                surname: user.surname
                            });

                        } else {
                            res.status(401).json({
                                message: 'Authentication failed.'
                            });
                        }
                    });
            }          
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/*
* Add support to change password
*/

router.patch('/:userId', checkAuth, (req, res, next) => {
    const id = req.params.userId;

    const updateObject = {
        name: req.body.name,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth
    }

    User.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(result => {

            if (result.nModified) {
                res.status(200).json({
                    status: result.ok,
                    changed: result.nModified,
                    message: 'User updated successfully'
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

router.delete('/:userId', checkAuth, (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(result => {

            const response = {
                count: result.result.n,
                status: result.result.ok,
                message: 'User deleted successfully'
            }

            if (result.result.n)
            {
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
    User.findByIdAndUpdate(
        req.params.id,
        { $push: { "library": req.params.idbook } },
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
    User.findByIdAndUpdate(
        req.params.id,
        { $pull: { "library": req.params.idbook } },
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