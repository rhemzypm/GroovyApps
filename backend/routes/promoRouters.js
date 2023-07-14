const express = require('express');

const authController = require('../controllers/authController');
const promoController = require('../controllers/promoController');

const router = express.Router();

router.use(authController.protect);

router.get('/', promoController.getAllPromos);
router.get('/:id', promoController.getPromo);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(promoController.uploadPromoImage, promoController.createPromo);

router
  .route('/:id')
  .patch(promoController.uploadPromoImage, promoController.updatePromo)
  .delete(promoController.deletePromo);

module.exports = router;
