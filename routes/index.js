const router = require('express').Router();
const { HomeController, TodoController, UserController } = require('../controllers');
const { Auth } = require('../middlewares');

// Home
router.get('/', HomeController.main);
// Users
router.get('/users', UserController.main);
router.post('/login', UserController.login);
router.post('/register', UserController.register);
    // Third-Party API
router.post('/users/send', UserController.send);
    /* Usage:
    Gunakan body form-encoded
    Required Key adalah sebagai berikut:
        - Kasih_ID dengan key User ID yang datanya ingin di ambil,
        - from dengan key pengirim email,
        - to dengan key penerima email,
        
     */
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