const router = require('express').Router();
const UserController = require('../Controller/UserController.js');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
