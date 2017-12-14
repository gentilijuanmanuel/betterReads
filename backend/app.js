const express = require('express');
const app = express();

const routes = require('./api/routes/index');

app.use(routes);

/*
* This is the error handler. Be sure to put all custom routes BEFORE this.
* If any request was catched by the routes BEFORE, the following route will handle the error
* and throw a message.
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