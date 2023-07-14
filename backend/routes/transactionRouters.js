const express = require('express');

const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post(
  '/checkout/:packageId',
  transactionController.createPurchaseTransaction
);

router.use(authController.restrictTo('admin'));

router.route('/').get(transactionController.getAllTransactions);
//   .post(transactionController.createTransaction);

router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
