"use strict";

var express = require('express');

var router = express.Router();

var authenticate = require('../middlewares/authenticate');

var trainer = require('../controllers/traniner-controller');

router.get('/gettrainer', authenticate, trainer.getrainer);
router.get('/admingettrainer', authenticate, trainer.admingettrainer);
router.get('/getbyusers/:id', authenticate, trainer.getUsersByTrainer);
module.exports = router;