const express = require('express');

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = express.Router();

router.use(authController.protect);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(postController.uploadPostImage, postController.createPost);

router
  .route('/:id')
  .patch(postController.uploadPostImage, postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
