const express = require('express');

const chirpRouter = require('./chirps');
const chirpAsyncRouter = require('./chirpsAsync');

let router = express.Router();

router.use('/chirps',chirpRouter);
router.use('/chirpsAsync',chirpAsyncRouter);

module.exports = router;