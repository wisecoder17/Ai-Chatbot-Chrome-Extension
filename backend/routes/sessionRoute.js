///////////
const express = require('express');
const router = express.Router();
const { createSession, endSession } = require('../controllers/sessionController');

router.post('/sessions', createSession);
router.put('/sessions/end', endSession);

module.exports = router;
