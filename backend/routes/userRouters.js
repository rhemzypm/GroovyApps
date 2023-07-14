const express = require('express');

// controller (inc)
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// middlewares
const {
  resendOTPRateLimiter,
  verifyOTPRateLimiter,
} = require('../middleware/rateLimiter');

// using router
const router = express.Router();

// authentication
router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);
router.get('/signOut', authController.signOut);

// OTP
router.get('/resendOTP', resendOTPRateLimiter, authController.resendOTP);
router.post('/verified', verifyOTPRateLimiter, authController.verifyOTP);

// router protection (nanti)
router.use(authController.protect);

// get user
router.get('/me', userController.getMe, userController.getUser);

// get user's package
router.get('/packages', userController.getPurchasedPackageByUser);

// update user
router.patch(
  '/updateProfile',
  userController.getMe,
  userController.uploadUserImage,
  userController.updateUserProfile
);

// restriction middleware

router.use(authController.restrictTo('admin', 'super-admin'));

// user management
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUserStatus);

// push user point
router.route('/:id/point').patch(userController.updateUserPoint);

module.exports = router;
