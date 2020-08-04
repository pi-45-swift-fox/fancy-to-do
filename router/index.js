const router = require('express').Router();
const authenticate = require('../middleware/authenticate.js');
const authorization = require('../middleware/authorization.js');
const TodoController = require('../Controller/TodoController.js');

router.get('/', authenticate, TodoController.viewAll);
router.post('/', authenticate, TodoController.post);
router.get('/:id', authenticate, authorization, TodoController.viewOne);
router.put('/:id', authenticate, authorization, TodoController.update);
router.delete('/:id', authenticate, authorization, TodoController.destroy);

module.exports = router;
