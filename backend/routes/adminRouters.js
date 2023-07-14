const express = require('express');

// controller (inc)
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

// using router
const router = express.Router();

// authentication
router.post('/signIn', authController.signInAdmin);
router.get('/signOut', authController.signOutAdmin);

// password account creation
router.post('/createPassword', authController.createPassword);

// router protection (nanti)
router.use(authController.protect);

// get user
router.get('/me', adminController.getMe, adminController.getAdmin);

router.patch('/changePassword', authController.changePassword);

router.use(authController.restrictTo('admin', 'super-admin'));

// admin manipulation
router.get('/', adminController.getAllAdmins);
router.post('/', authController.createAdmin);

module.exports = router;
