const router = require('express').Router();
const TodoController = require('../Controller/TodoController.js');

router.get('/', TodoController.viewAll);
router.post('/', TodoController.post);
router.get('/:id', TodoController.viewOne);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.destroy);

module.exports = router;
