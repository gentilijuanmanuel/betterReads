const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    User.find()
        .select('username name surname email sex')
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

router.post('/', (req, res, next) => {
    const user = new User ({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        sex: req.body.sex
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
            console.log(err);
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
                message: 'User deleted successfully',
            }

            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;