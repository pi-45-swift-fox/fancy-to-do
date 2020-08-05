const router = require('express').Router();
const { TodoController } = require('../controllers');
const { Auth } = require('../middlewares');

router.get('/', TodoController.main);
router.get('/add', TodoController.getNew);
router.post('/add', TodoController.postNew);
router.get('/:id', TodoController.detail);
router.delete('/:id/delete', Auth.checkUser, TodoController.delete);
router.get('/:id/edit', Auth.checkUser, TodoController.getEdit);
router.post('/:id/edit', Auth.checkUser, TodoController.postEdit);

module.exports = router;