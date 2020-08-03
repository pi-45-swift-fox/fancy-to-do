const router = require('express').Router();
const {HomeController, TodoController} = require('../controllers');

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
router.get('/todos/:id/delete', TodoController.delete);
router.get('/todos/:id/edit', TodoController.getEdit);
router.post('/todos/:id/edit', TodoController.postEdit);


module.exports = router;