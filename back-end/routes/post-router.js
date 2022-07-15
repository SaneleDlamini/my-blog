const router = require('express').Router();
const postController = require('../controllers/post-controller.js');
const multer = require('multer');

const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './front-end/public/images/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({storage : storage})


router.get('/posts', postController.getPosts);

router.get('/post/all', postController.getAllPost);

router.post('/post', auth, upload.single("image"), postController.createPost);

router.put('/post/:id', auth, upload.single("image"), postController.updatePost);

router.get('/my-posts', auth, postController.getMyPosts);

router.get('/post/:id', postController.getPost);

router.delete('/post/:id', auth, postController.deletePost)




module.exports = router;