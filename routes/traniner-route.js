const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const trainer = require('../controllers/traniner-controller')


router.post('/createtraniner',authenticate,trainer.createtraniner);
router.get('/gettrainer', authenticate, trainer.gettrainer);


module.exports = router;