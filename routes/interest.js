
const express = require('express');
const router = express.Router();

/* SnackControllers that handles snack functions */
var interestController = require('../controllers/interestController');

// POST request to create a snack
router.post('/create', interestController.interestCreatePost);

// GET request to view all orders of a vendor
router.get('/', interestController.interestListGet);

// POST request to update a snack
router.post('/update', interestController.interestUpdatePost);

module.exports = router;
