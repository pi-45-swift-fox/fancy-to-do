const router = require('express').Router();
const { UserController } = require('../controllers');
const TodoRouter = require('./todo');

// Home
router.get('/', UserController.detail);
router.get('/users', UserController.main);
router.post('/login', UserController.login);
router.post('/register', UserController.register);
    // Third-Party API
router.post('/send', UserController.send);
// Todos
router.use('/todos', TodoRouter);

module.exports = router;