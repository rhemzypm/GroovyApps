const express = require('express');

// controllers
const authController = require('../controllers/authController');
const faqController = require('../controllers/faqController');

const router = express.Router();

// package route
router.use(authController.protect);

router.get('/', faqController.getAllFaqs);

router.get('/:id', faqController.getFaq);

router.use(authController.restrictTo('admin'));

router.route('/').post(faqController.createFaq);

router.route('/:id/disabled').patch(faqController.disableFaq);
router.route('/:id/enabled').patch(faqController.enableFaq);

router
  .route('/:id')
  .patch(faqController.updateFaq)
  .delete(faqController.deleteFaq);

module.exports = router;
