const express = require ('express');
const router = express.Router();
const postController = require ('../controllers/post');
const extractFile = require ('../middleware/file');
const checkAuth = require ('../middleware/check-auth');

router.post('', checkAuth, extractFile, postController.createPost);

router.get('', postController.getPosts);

router.get('/:id', postController.getPost);

router.delete('/:id', checkAuth, postController.deletePost);

router.put('/:id', checkAuth, extractFile, postController.updatePost);


module.exports = router;
