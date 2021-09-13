
const express = require('express');
const router = express.Router();

/* SnackControllers that handles snack functions */
var orderController = require('../controllers/interestController');

// POST request to create a snack
router.post('/create', orderController.orderCreatePost);

// GET request to view all orders of a vendor
router.get('/', orderController.orderListGet);

// POST request to update a snack
router.post('/:id/update', orderController.orderUpdatePost);

module.exports = router;
