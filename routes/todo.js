const express = require('express');

const TodoController = require('../controllers/todo');

const router = express.Router();

router.post('/', TodoController.createTodo);

router.get('/', TodoController.getTodos);

router.get('/:id', TodoController.getTodo);

router.patch('/:id/completed', TodoController.completeTodo);

router.patch('/:id/notCompleted', TodoController.notCompleteTodo);

router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
