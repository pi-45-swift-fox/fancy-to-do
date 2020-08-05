const router = require('express').Router();
const { TodoController } = require('../controllers');
const { Auth } = require('../middlewares');

router.get('/', TodoController.main);
router.post('/', Auth.check, TodoController.new);
router.get('/:id', TodoController.detail);
router.delete('/:id', Auth.checkUser, TodoController.delete);
router.put('/:id', Auth.checkUser, TodoController.edit);

module.exports = router;