const router = require('express').Router();
const { HomeController, UserController } = require('../controllers');
const TodoRouter = require('./todo');

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
router.get('/todos', TodoRouter);

module.exports = router;