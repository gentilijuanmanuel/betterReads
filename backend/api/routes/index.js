const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const authorRoutes = require('./author');
const bookRoutes = require('./book');

router.use('/api/user', userRoutes);
router.use('/api/author', authorRoutes);
router.use('/api/book', bookRoutes);

module.exports = router;