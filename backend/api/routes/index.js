const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const authorRoutes = require('./author');
const bookRoutes = require('./book');
// const quoteRoutes = require('./quote');
// const reviewRoutes = require('./review');

router.use('/api/user', userRoutes);
router.use('/api/author', authorRoutes);
router.use('/api/book', bookRoutes);
// router.use('/api/quote', quoteRoutes);
// router.use('/api/review', reviewRoutes);

module.exports = router;