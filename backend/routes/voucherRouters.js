const express = require('express');

const authController = require('../controllers/authController');
const voucherController = require('../controllers/voucherController');

const router = express.Router();

router.use(authController.protect);

router.get('/', voucherController.getAllVouchers);
router.get('/:id', voucherController.getVoucher);

router.patch('/:id/redeem', voucherController.redeemVoucher);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(voucherController.uploadVoucherImage, voucherController.createVoucher);

router
  .route('/:id')
  .patch(voucherController.uploadVoucherImage, voucherController.updateVoucher)
  .delete(voucherController.deleteVoucher);

module.exports = router;
