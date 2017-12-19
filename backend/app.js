const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/better-reads',{useMongoClient: true });
require('./api/models/author.js');
require('./api/models/book.js');
require('./api/models/quote.js');
require('./api/models/review.js');
require('./api/models/user.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
* CORS handling
*/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

/*
* Here we put all the routes which should handle requests.
*/

const routes = require('./api/routes/index');
app.use(routes);

/*
* This is the error handler. Be sure to put all custom routes BEFORE this.
* If any request was not catched by the routes BEFORE,
* the following routes will handle the error and throw a message.
*/

app.use((req, res, next) => {
    const error = new Error('What you are looking for is not here');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;