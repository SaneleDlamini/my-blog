const router = require('express').Router();
const userController = require('../controllers/user-controller');
const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');


router.get('/', auth, userController.getUsers);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.put('/:id', auth, userController.updateUser);

router.get('/:id', userController.getUser);

router.delete('/:id', auth, userController.deleteUser);

module.exports = router;