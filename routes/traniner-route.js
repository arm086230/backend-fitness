const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const trainer = require('../controllers/traniner-controller')

router.get('/gettrainer', authenticate,trainer.getrainer);

module.exports = router;