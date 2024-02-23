const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate')
const booking = require('../controllers/booking')
const admin = require('../controllers/admin-controller')

router.post('/createbooking',authenticate, booking.createbooking);
router.get('/getbooking', authenticate, booking.getbooking);
router.delete('/delete/:delebooks', authenticate, booking.deletebooking);
router.get('/admin', authenticate, admin.getadminbooking);

module.exports = router;