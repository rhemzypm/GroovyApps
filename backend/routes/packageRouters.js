const express = require('express');

// controllers
const authController = require('../controllers/authController');
const packageController = require('../controllers/packageController');

const router = express.Router();

router.use(authController.protect);

// package route

router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackage);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(packageController.uploadPackagePhoto, packageController.createPackage);

router
  .route('/:id')
  .patch(packageController.uploadPackagePhoto, packageController.updatePackage)
  .delete(packageController.deletePackage);

module.exports = router;
