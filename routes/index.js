const router = require('express').Router();
const {HomeController, TodoController} = require('../controllers');
const Auth = require('../middlewares');

// Home
router.get('/', HomeController.main);
router.post('/login', HomeController.login);
router.post('/register', HomeController.register);
// Todos
router.get('/todos', TodoController.main);
router.get('/todos/add', TodoController.getNew);
router.post('/todos/add', TodoController.postNew);
    // Sub Todos
router.get('/todos/:id', TodoController.detail);
router.delete('/todos/:id/delete', Auth.checkUser, TodoController.delete);
router.get('/todos/:id/edit', Auth.checkUser, TodoController.getEdit);
router.post('/todos/:id/edit', Auth.checkUser, TodoController.postEdit);

module.exports = router;