const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    User.find()
        .select('name surname email gender library')
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
        .select('email password name surname dateOfBirth gender library')
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

    User.find({'username': req.body.username})
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
                                console.log(result);
                                res.status(201).json({
                                    message: "User created successfully",
                                    createdUser: {
                                        _id: result._id,
                                        username: result.username
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
                                expiresIn: '1h'

                            });

                            res.status(401).json({
                                message: 'Authentication success.',
                                token: token
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
* PATCH is update, PUT is replace
* JSON structure for requests
*   [
*	   {"change" : "name", "value" : "Julian"},
*	   {"change" : "surname", "value" : "Poma"}
*   ]
*/

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;

    const updateArray = {}

    for(const ops of req.body) {
        updateArray[ops.change] = ops.value;
    }

    User.update({ _id: id }, { $set: updateArray })
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

router.delete('/:userId', (req, res, next) => {
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

module.exports = router;