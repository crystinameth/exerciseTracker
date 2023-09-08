const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/api/users/:_id/exercises', exerciseController.addExercise);
router.get('/api/users/:_id/logs', exerciseController.getExerciseLog);

module.exports = router;

