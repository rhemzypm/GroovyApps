const express = require('express');

const authController = require('../controllers/authController');
const pointController = require('../controllers/pointController');

const router = express.Router();

router.use(authController.protect);

router.use(authController.restrictTo('admin'));

router.route('/').get(pointController.getAllUserPoints);

router.route('/:id').get(pointController.getUserPoint);
// .patch(pointController.pushUserPoint);

router.route('/convert').post(pointController.convertPoints);

module.exports = router;
