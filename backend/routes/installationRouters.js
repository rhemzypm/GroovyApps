const express = require('express');

const installationController = require('../controllers/installationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(installationController.getAllInstallations)
  .post(installationController.createInstallation);

router.route('/:id').get(installationController.getInstallation);

module.exports = router;
