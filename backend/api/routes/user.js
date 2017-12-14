const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var User = mongoose.model('User');

var ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Users GET request working'
    })
});

//aún no funciona
router.post('/new', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let surname = req.body.surname;
    let dateOfBirth = req.body.dateOfBirth;
    let email = req.body.email;
    let sex = req.body.sex;

    var user = new User({
        username: username,
        password: password,
        name: name,
        surname: surname,
        dateOfBirth: dateOfBirth,
        email: email,
        sex: sex
    });

    user.save((err, user) => {
        if(err) {
            res.status(500).send(err);
        }
        res.status(200).send("User submitter \n" + user);
    })
});


module.exports = router;