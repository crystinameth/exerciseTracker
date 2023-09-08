const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/users', userController.createUser);
router.get('/api/users', userController.getAllUsers);

module.exports = router;