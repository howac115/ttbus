
const express = require('express');
const router = express.Router();

var visitController = require('../controllers/visitController');

router.post('/create', visitController.visitCreatePost);

router.get('/', visitController.visitListGet);

router.get('/:id', visitController.visitDetailGet);

module.exports = router;
