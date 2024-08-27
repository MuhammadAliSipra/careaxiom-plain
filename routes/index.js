const express = require('express');
const router = express.Router();
const titleController = require('../controller/index');

// Route to handle fetching titles
router.get('/', titleController.getUrlsToGtTitles);

module.exports = router;
