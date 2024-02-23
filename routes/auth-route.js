const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth-controller");
const authenticate = require('../middlewares/authenticate');
const workController = require('../controllers/work-controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getme);
router.post('/workout/:id',authenticate,workController.workout);
router.get('/getworkout',authenticate,workController.getworkout);
router.get('/all-status', authenticate, workController.getAllStatus)
router.put('/updateworkout/:id',authenticate,workController.updateworkout)

module.exports = router;


// router.get('/log', read)
// router.get('/log/:id',  list)