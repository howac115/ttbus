
const express = require('express');
const router = express.Router();

/* AuthenticationControllers that handles register and login */
var userController = require('../controllers/userController');

// POST request for register customer's detail 
router.post('/register', userController.userRegisterPost);

// POST request for customer login
router.post('/login', userController.userLoginPost);

module.exports = router;
