
const express = require('express');
const router = express.Router();

/* SnackControllers that handles snack functions */
var snackController = require('../controllers/scheduleController');

// POST request to create a snack
router.post('/create', snackController.snackCreatePost);

// GET request to get all snacks
router.get('/', snackController.snackListGet);

// GET request to one snack
router.get('/:id', snackController.snackDetailGet);

module.exports = router;
