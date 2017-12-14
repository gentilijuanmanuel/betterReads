const express = require('express');
const app = express();

const routes = require('./api/routes/index');

app.use(routes);

app.use((req, res, next) => {
    res.status(200).json({
        message: 'The server is working!'
    });
});

module.exports = app;