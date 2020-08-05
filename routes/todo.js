const router = require('express').Router();
const { TodoController } = require('../controllers');
const { Auth } = require('../middlewares');

router.get('/', TodoController.main);
router.post('/add', TodoController.new);
router.get('/:id', TodoController.detail);
router.delete('/:id/delete', Auth.checkUser, TodoController.delete);
router.post('/:id/edit', Auth.checkUser, TodoController.edit);

module.exports = router;