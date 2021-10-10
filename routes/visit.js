
const express = require('express');
const router = express.Router();

var visitController = require('../controllers/visitController');

router.post('/create', visitController.visitCreatePost);

router.get('/', visitController.visitListGet);

router.post('/update', visitController.visitUpdatePost);

module.exports = router;
