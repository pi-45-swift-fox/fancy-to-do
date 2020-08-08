const router = require('express').Router();
const { TodoController } = require('../controllers');
const { Auth } = require('../middlewares');

// router.get('/', TodoController.main); // DEPRECATED
router.post('/', Auth.check, TodoController.new);
router.get('/:id', Auth.check, Auth.checkUser, TodoController.detail);
router.delete('/:id', Auth.check, Auth.checkUser, TodoController.delete);
router.put('/:id', Auth.check, Auth.checkUser, TodoController.edit);

module.exports = router;