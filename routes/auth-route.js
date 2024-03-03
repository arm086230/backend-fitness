const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth-controller");
const authenticate = require('../middlewares/authenticate');
const workController = require('../controllers/work-controller');
const adminuser = require('../controllers/admin-controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getme);
router.post('/workout/',authenticate,workController.workout);
router.get('/getworkout',authenticate,workController.getworkout);
router.get('/all-status', authenticate, workController.getAllStatus)
router.delete('/del/:id',authenticate,workController.deleteworkout);
router.get('/getuser' , authenticate,adminuser.getadminuser)
router.delete('/deluser/:id', authenticate,adminuser.deleteuser)
// router.patch('/updateuser:/id',authenticate,adminuser.updateuser)


module.exports = router;


// router.get('/log', read)
// router.get('/log/:id',  list)