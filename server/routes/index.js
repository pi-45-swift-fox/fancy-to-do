const router = require('express').Router();
const { UserController } = require('../controllers');
const TodoRouter = require('./todo');
const { Auth } = require('../middlewares');

// Home
router.get('/user/todo', Auth.check, UserController.detail);
router.get('/users', UserController.main);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);
router.post('/register', UserController.register);
    // Third-Party API
router.post('/send', UserController.send);
// Todos
router.use('/todos', TodoRouter);

module.exports = router;