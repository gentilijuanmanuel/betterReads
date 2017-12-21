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

/*
* CAREFUL: Does not return password.
*/

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;

    User.findById(id)
        .select('username name surname dateOfBirth email gender')
        .exec()
        .then(result => {
            res.status(200).json(result)
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
})

module.exports = router;